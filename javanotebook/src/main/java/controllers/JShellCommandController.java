package controllers;

import models.CommandOutput;
import models.dto.ReceivedCommandVM;
import utils.JShellExecutor;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class JShellCommandController {
    @PostMapping(value = "/jshellCommand")
    public List<CommandOutput> command(@RequestBody ReceivedCommandVM command){
        JShellExecutor executor = new JShellExecutor();
        List<CommandOutput> output= executor.evaluateCommand(command.getCommand());
        return output;
    }
}