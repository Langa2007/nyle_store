const globalStore = globalThis.__apiRateLimitStore || new Map();

if (!globalThis.__apiRateLimitStore) {
  globalThis.__apiRateLimitStore = globalStore;
}

const getClientIp = (request) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
};

export const rateLimitRequest = ({
  request,
  namespace,
  maxRequests,
  windowMs,
}) => {
  const now = Date.now();
  const ip = getClientIp(request);
  const key = `${namespace}:${ip}`;

  const bucket = globalStore.get(key);
  if (!bucket || now > bucket.expiresAt) {
    globalStore.set(key, {
      count: 1,
      expiresAt: now + windowMs,
    });
    return { limited: false };
  }

  if (bucket.count >= maxRequests) {
    return { limited: true };
  }

  bucket.count += 1;
  globalStore.set(key, bucket);
  return { limited: false };
};
