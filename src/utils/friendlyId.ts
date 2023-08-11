import { v4 as uuidv4 } from 'uuid';
import base62 from 'base62';

export function generateFriendlyId(): string {
  return base62.encode(parseInt(uuidv4().replace(/-/g, ''), 16));
}