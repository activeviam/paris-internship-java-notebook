package com.models.dto;

public class ReceivedCommandVM {

  private String command;

  public ReceivedCommandVM() {
    // Empty constructor needed for Jackson.
  }

  public String getCommand() {
    return this.command;
  }
}