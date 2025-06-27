import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "../App";

// Mock the sound effects module
jest.mock("../utils/soundEffects");

describe("App Component", () => {
  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("renders initial state correctly", () => {
    render(<App />);

    expect(screen.getByText("HIIT Timer")).toBeInTheDocument();
    expect(screen.getByText("START")).toBeInTheDocument();
    expect(screen.getByText("20s/10s")).toBeInTheDocument();
  });

  test("starts timer when START is clicked", () => {
    render(<App />);

    fireEvent.click(screen.getByText("START"));

    expect(screen.getByText("WORKOUT")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  test("switches from workout to rest", () => {
    render(<App />);

    fireEvent.click(screen.getByText("START"));

    // Fast forward through complete workout duration (20 seconds + 1 for transition)
    act(() => {
      jest.advanceTimersByTime(21000);
    });

    expect(screen.getByText("REST")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  test("shows reposition state during rest period", () => {
    render(<App />);

    fireEvent.click(screen.getByText("START"));

    // Move through workout to rest period
    act(() => {
      jest.advanceTimersByTime(21000);
    });

    // The repositioning trigger is calculated as Math.min(3, Math.floor(rest/2))
    // For 10s rest: Math.min(3, 5) = 3 seconds remaining
    // Rest starts at 10, counts down: 10, 9, 8, 7, 6, 5, 4, 3 <- triggers here, but displays 2
    // So we need to advance 8 seconds into the 10-second rest period to see display of 2
    act(() => {
      jest.advanceTimersByTime(8000);
    });

    const app = document.querySelector(".app");
    expect(app).toHaveClass("reposition-state");
    expect(screen.getByText("REPOSITION")).toBeInTheDocument();
  });

  test("stops timer when STOP is clicked", () => {
    render(<App />);

    fireEvent.click(screen.getByText("START"));
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    fireEvent.click(screen.getByText("STOP"));

    expect(screen.getByText("HIIT Timer")).toBeInTheDocument();
    expect(screen.getByText("START")).toBeInTheDocument();
  });

  test("changes configuration when different timing is selected", () => {
    render(<App />);

    fireEvent.click(screen.getByText("30s/15s"));
    fireEvent.click(screen.getByText("START"));

    expect(screen.getByText("30")).toBeInTheDocument();
  });

  test("tracks elapsed time correctly", () => {
    render(<App />);

    fireEvent.click(screen.getByText("START"));

    act(() => {
      jest.advanceTimersByTime(65000);
    });

    expect(screen.getByText("Total Time: 01:05")).toBeInTheDocument();
  });
});
