import { describe, expect, it } from "vitest";

import { setupMobileDialog, setupMobileToggleButton } from "./mobile-nav";

class FakeButton {
  dataset: Record<string, string | undefined> = {};
  private listeners = new Map<string, Array<(event: unknown) => void>>();

  addEventListener(type: string, listener: (event: unknown) => void) {
    const current = this.listeners.get(type) ?? [];
    current.push(listener);
    this.listeners.set(type, current);
  }

  dispatch(type: string, event: unknown = {}) {
    for (const listener of this.listeners.get(type) ?? []) listener(event);
  }

  listenerCount(type: string) {
    return this.listeners.get(type)?.length ?? 0;
  }
}

class FakeDialog extends FakeButton {
  open = false;
  closeCalls = 0;
  showModalCalls = 0;

  close() {
    this.open = false;
    this.closeCalls += 1;
  }

  showModal() {
    this.open = true;
    this.showModalCalls += 1;
  }
}

describe("mobile nav binding guards", () => {
  it("binds the mobile toggle only once across repeated setup calls", () => {
    const button = new FakeButton();
    const dialog = new FakeDialog();

    expect(setupMobileToggleButton(button, () => dialog)).toBe(true);
    expect(setupMobileToggleButton(button, () => dialog)).toBe(false);
    expect(button.listenerCount("click")).toBe(1);

    button.dispatch("click");
    expect(dialog.open).toBe(true);
    expect(dialog.showModalCalls).toBe(1);

    button.dispatch("click");
    expect(dialog.open).toBe(false);
    expect(dialog.closeCalls).toBe(1);
  });

  it("binds the mobile dialog only once across repeated setup calls", () => {
    const dialog = new FakeDialog();
    const closeButton = new FakeButton();

    expect(setupMobileDialog(dialog, closeButton)).toBe(true);
    expect(setupMobileDialog(dialog, closeButton)).toBe(false);
    expect(dialog.listenerCount("click")).toBe(1);
    expect(closeButton.listenerCount("click")).toBe(1);

    dialog.open = true;
    closeButton.dispatch("click");
    expect(dialog.open).toBe(false);
    expect(dialog.closeCalls).toBe(1);

    dialog.open = true;
    dialog.dispatch("click", { target: dialog });
    expect(dialog.open).toBe(false);
    expect(dialog.closeCalls).toBe(2);
  });
});
