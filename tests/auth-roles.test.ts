import { describe, expect, test } from "vitest";
import { canEdit, canPublish, type AdminRole } from "@/server/auth";

// Full role matrix. These two predicates gate every admin mutation and the
// media upload route, so an accidental widening here is a privilege escalation.
const roles: AdminRole[] = ["owner", "admin", "editor", "viewer"];

describe("canEdit", () => {
  test.each([
    ["owner", true],
    ["admin", true],
    ["editor", true],
    ["viewer", false],
  ] as const)("%s -> %s", (role, expected) => {
    expect(canEdit(role)).toBe(expected);
  });
});

describe("canPublish", () => {
  test.each([
    ["owner", true],
    ["admin", true],
    ["editor", false],
    ["viewer", false],
  ] as const)("%s -> %s", (role, expected) => {
    expect(canPublish(role)).toBe(expected);
  });
});

describe("role matrix invariants", () => {
  test("publish permission implies edit permission", () => {
    for (const role of roles) {
      if (canPublish(role)) expect(canEdit(role)).toBe(true);
    }
  });

  test("viewer can do neither", () => {
    expect(canEdit("viewer")).toBe(false);
    expect(canPublish("viewer")).toBe(false);
  });

  test("no role outside the known list is granted access", () => {
    // Guards against a future role string being silently treated as privileged.
    const unknown = "superuser" as AdminRole;
    expect(canEdit(unknown)).toBe(false);
    expect(canPublish(unknown)).toBe(false);
  });
});
