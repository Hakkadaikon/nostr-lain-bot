/**
 * @summary Get current unix time
 */
export function currUnixTime() {
  return Math.floor(Date.now() / 1000);
}

/**
 * @summary Reply cool time duration
 */
const COOL_TIME_DUR_SEC = 10;

/**
 * @summary Last reply time per id(pubkey)
 */
const lastReplyTimePerId = new Map();

/**
 * @summary Unix time at bot startup
 */
const initTime = currUnixTime();

/**
 * @summary Check if the reply cool time has passed
 */
export function passedReplyCoolTime(id) {
  const now = currUnixTime();
  const lastReplyTime = lastReplyTimePerId.get(id);
  if (lastReplyTime === undefined) {
    lastReplyTimePerId.set(id, now);
    return true;
  }

  if (now - lastReplyTime > COOL_TIME_DUR_SEC) {
    lastReplyTimePerId.set(id, now);
    return true;
  }

  return false;
}

/**
 * @summary Check if the event is new
 */
export function isNewEvent(eventTime) {
  if (initTime > eventTime) {
    return false;
  }
  return true;
}
