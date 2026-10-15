import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LaunchExperience } from "@/components/launch-experience";

afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); });

describe("Launch interaction", () => {
  it("reveals after the alpha is clicked and allows replay", () => {
    vi.useFakeTimers();
    render(<LaunchExperience />);
    expect(screen.queryByRole("heading")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Break the silence" }));
    expect(screen.getByRole("button", { name: "Break the silence" })).toBeDisabled();
    act(() => { vi.advanceTimersByTime(1350); });
    expect(screen.getByRole("heading")).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "REPLAY THE MOMENT" }));
    expect(screen.queryByRole("heading")).toBeNull();
    expect(screen.getByRole("button", { name: "Break the silence" })).toBeEnabled();
  });

  it("skips the dramatic delay when reduced motion is requested", () => {
    vi.useFakeTimers();
    vi.spyOn(window, "matchMedia").mockReturnValue({ matches: true } as MediaQueryList);
    render(<LaunchExperience />);
    fireEvent.click(screen.getByRole("button", { name: "Break the silence" }));
    act(() => { vi.advanceTimersByTime(80); });
    expect(screen.getByRole("heading")).toHaveFocus();
  });
});