import * as redis from "redis";

function NewClientForTenant(tenant: string): redis.RedisClient {
    return redis.createClient({host:"localhost", port: 6379, prefix: tenant+":"});
}

const tenant1 = NewClientForTenant("tenant1");
const tenant2 = NewClientForTenant("tenant2");
const tenant3 = NewClientForTenant("tenant3");

tenant1.set("hello", "world");
tenant2.set("test", "out");
tenant3.set("foo", "bar");