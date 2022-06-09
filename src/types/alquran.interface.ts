
export interface SurahData {
    surat_text_full: string;
    surat_english_name: string;
    surat_golongan: string;
    surat_name: string;
    id: number;
    surat_terjemahan: string;
    surat_text: string;
    revelation_type: string;
    count_ayat: number;
    surat_english_terjemahan: string;
}

export interface AyahData {
    audio: string;
    audio_secondary: string[];
    aya_id: number;
    aya_number: number;
    aya_text: string;
    hizb_quarter: number;
    juz_id: number;
    manzil: number;
    page_number: number;
    rukuk: number;
    sajda: boolean | any;
    sura_id: number;
    translation_aya_text: string;
    translation_aya_text_en: string;
    is_new_surat: boolean;
    is_bacaan?: boolean;
    is_favorite?: boolean;
    transliteration: Transliteration;
    tafsir: Tafsir;

}

export interface Transliteration {
    en: string;
}

export interface Tafsir {
    id: TafsirLanguage;
}

export interface TafsirLanguage {
    long: string;
    short: string;
}

export interface SurahAndAyah {
    surah_data: SurahData;
    ayah_data: AyahData[];
}

export interface Metadata {
    surah: number;
    ayah: number;
    number: number;
}

export interface PageMetadata {
    page: number;
    surat: number;
    ayat: number;
}

export interface SajdaMetadata {
    surah: number;
    ayah: number;
    number: number;
    recommended: boolean;
    obligatory: boolean;
}

