package models.dto;

/**
 * View Model extending the UserDTO, which is meant to be used in the user
 * management UI.
 */
public class ReceivedCommandVM {

  private String command;

  public ReceivedCommandVM() {
    // Empty constructor needed for Jackson.
  }

  public String getCommand() {
    return this.command;
  }
}