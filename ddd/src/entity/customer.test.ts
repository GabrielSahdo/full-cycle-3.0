import { assertEquals } from "@std/assert";
import Customer from "./customer.ts";
import { assertThrows } from "@std/assert/throws";

Deno.test("Customer should be created with id and name", () => {
    const customer = new Customer("123", "Gabriel");
    assertEquals(customer.id, "123");
    assertEquals(customer.name, "Gabriel");
});

Deno.test("Customer should be created inactive", () => {
    const customer = new Customer("123", "Gabriel");
    assertEquals(customer.active, false);
});

Deno.test("Should fail to activate customer without address", () => {
    const customer = new Customer("123", "Gabriel");
    assertEquals(customer.active, false);
    assertThrows(() => customer.activate(), Error, "Address is required");
});
