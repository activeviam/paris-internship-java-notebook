package com.models.dto;

public class ReceivedCommandVM {

  private String command;
  private long id;

  public ReceivedCommandVM() {
    // Empty constructor needed for Jackson.
  }

  public String getCommand() {
    return this.command;
  }

  public long getId(){
    return this.id;
  }
}