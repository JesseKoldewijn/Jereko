type DatasetHolder = {
  dataset: Record<string, string | undefined>;
};

type EventTargetLike = {
  addEventListener(type: string, listener: (event: unknown) => void): void;
};

type ToggleButtonLike = DatasetHolder & EventTargetLike;

type DialogLike = DatasetHolder &
  EventTargetLike & {
    open: boolean;
    close(): void;
    showModal(): void;
  };

const MOBILE_TOGGLE_BOUND_FLAG = "mobileToggleBound";
const MOBILE_DIALOG_BOUND_FLAG = "mobileNavDialogBound";

export function setupMobileToggleButton(
  btn: ToggleButtonLike | null,
  getDialog: () => DialogLike | null,
): boolean {
  if (!btn || btn.dataset[MOBILE_TOGGLE_BOUND_FLAG] === "true") return false;

  btn.dataset[MOBILE_TOGGLE_BOUND_FLAG] = "true";
  btn.addEventListener("click", () => {
    const dialog = getDialog();
    if (!dialog) return;
    if (dialog.open) dialog.close();
    else dialog.showModal();
  });

  return true;
}

export function setupMobileDialog(
  dialog: DialogLike | null,
  closeBtn?: EventTargetLike | null,
): boolean {
  if (!dialog || dialog.dataset[MOBILE_DIALOG_BOUND_FLAG] === "true") {
    return false;
  }

  dialog.dataset[MOBILE_DIALOG_BOUND_FLAG] = "true";

  closeBtn?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (
      typeof event === "object" &&
      event !== null &&
      "target" in event &&
      event.target === dialog
    ) {
      dialog.close();
    }
  });

  return true;
}
