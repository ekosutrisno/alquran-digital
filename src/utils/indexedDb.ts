interface StorableData {
    idb_key: string | number;
    [key: string]: any;
}

class IndexedDBStore<T extends StorableData> {
    private readonly dbName: string;
    private readonly storeName: string;
    private readonly version: number;
    private db: IDBDatabase | null = null;

    constructor(dbName: string = 'ad_store', storeName: string = 'local_db', version: number = 1) {
        this.dbName = dbName;
        this.storeName = storeName;
        this.version = version;
    }

    private async getDatabase(): Promise<IDBDatabase> {
        if (this.db) return this.db;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'idb_key' });
                }
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    private async executeTransaction<R>(
        mode: IDBTransactionMode,
        operation: (store: IDBObjectStore) => IDBRequest
    ): Promise<R> {
        const db = await this.getDatabase();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this.storeName], mode);
            const store = transaction.objectStore(this.storeName);
            const request = operation(store);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);

            transaction.oncomplete = () => {
                if (mode === 'readwrite') {
                    this.db?.close();
                    this.db = null;
                }
            };
        });
    }

    async exists(key: string | number): Promise<boolean> {
        const result = await this.executeTransaction<T | undefined>(
            'readonly',
            (store) => store.get(key)
        );
        return result !== undefined;
    }

    async save(data: T, overwrite: boolean = true): Promise<void> {
        const exists = await this.exists(data.idb_key);

        if (exists && !overwrite) {
            throw new Error(`Record with key ${data.idb_key} already exists`);
        }

        // Use put instead of add to handle both insert and update
        await this.executeTransaction('readwrite', (store) => store.put(data));
    }

    async saveIfNotExists(data: T): Promise<boolean> {
        const exists = await this.exists(data.idb_key);

        if (!exists) {
            await this.save(data);
            return true;
        }
        return false;
    }

    async get(key: string | number): Promise<T | null> {
        const result = await this.executeTransaction<T | undefined>(
            'readonly',
            (store) => store.get(key)
        );
        return result || null;
    }

    async remove(key: string | number): Promise<void> {
        await this.executeTransaction('readwrite', (store) => store.delete(key));
    }

    async clear(): Promise<void> {
        await this.executeTransaction('readwrite', (store) => store.clear());
    }

    async update(key: string | number, updatedData: Partial<T>): Promise<void> {
        const existingData = await this.get(key);
        if (!existingData) {
            throw new Error('Data not found');
        }

        const newData = {
            ...existingData,
            ...updatedData,
            idb_key: key
        };

        await this.executeTransaction('readwrite', (store) => store.put(newData));
    }

    async closeConnection(): Promise<void> {
        if (this.db) {
            this.db.close();
            this.db = null;
        }
    }
}

export { IndexedDBStore, type StorableData };