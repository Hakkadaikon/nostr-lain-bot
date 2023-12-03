/**
 * @summary Log output for debugging
 */
export const debug = (msg) => {
  const now = new Date();
  console.log(now.toString() + " debug: " + msg);
};

/**
 * @summary Log output for information
 */
export function info(msg) {
  const now = new Date();
  console.log(now.toString() + " info : " + msg);
}

/**
 * @summary Log output for warnings
 */
export function warn(msg) {
  const now = new Date();
  console.warn(now.toString() + " warn : " + msg);
}

/**
 * @summary Log output for errors
 */
export function error(msg) {
  const now = new Date();
  console.error(now.toString() + " error: " + msg);
}
