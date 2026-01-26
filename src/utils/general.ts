/**
 * Utility functions
 */

/**
 * Check if two objects are equal by comparing their properties
 */
export function areObjectsEqual(obj1: any, obj2: any): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!obj2.hasOwnProperty(key)) {
      return false;
    }

    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

/**
 * Create a promise that resolves after a specified time
 */
export function awaitableTimeout(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

