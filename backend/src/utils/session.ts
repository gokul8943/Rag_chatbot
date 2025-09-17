import { v4 as uuidv4 } from "uuid";

export function createSessionId() {
  return uuidv4();
}
