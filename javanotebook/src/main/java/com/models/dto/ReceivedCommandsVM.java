package com.models.dto;


import java.util.List;
import com.models.CommandAndId;


public class ReceivedCommandsVM {

  private List<CommandAndId> commandsAndIds;
  private Long notebookId;

  public ReceivedCommandsVM() {
    // Empty constructor needed for Jackson.
  }

  public List<CommandAndId> getCommands() {
    return this.commandsAndIds;
  }

  public long getNotebookId(){
    return this.notebookId;
  }

  public void setNotebookId(Long notebookId) {
    this.notebookId = notebookId;
  }

  public void setCommandsAndIds(List<CommandAndId> commandsAndIds) {
    this.commandsAndIds = commandsAndIds;
  }

}