import * as redis from "redis";

function NewClientForTenant(tenant?: string, db?: string): redis.RedisClient {
    return redis.createClient({host:"localhost", port: 6379, prefix: tenant, db: db});
}

function MultiTenancyUsingPrefix() {
    const tenant1 = NewClientForTenant("tenant1:");
    const tenant2 = NewClientForTenant("tenant2:");
    
    console.log("With Prefix");

    tenant1.set("hello", "world", redis.print);
    tenant2.set("test", "out", redis.print);
    
    tenant2.get("test", redis.print)
    tenant2.get("hello", redis.print)

    tenant1.quit()
    tenant2.quit()
}

function MultiTenancyUsingMultiDB() {
    const tenant1 = NewClientForTenant(undefined, "0")
    const tenant2 = NewClientForTenant(undefined, "1")

    console.log("With multi db");

    tenant1.set("hello", "world", redis.print);
    tenant2.set("test", "out", redis.print);
    
    tenant2.get("test", redis.print);
    tenant2.get("hello", redis.print);

    tenant1.quit();
    tenant2.quit();
}

MultiTenancyUsingPrefix();
// MultiTenancyUsingMultiDB();