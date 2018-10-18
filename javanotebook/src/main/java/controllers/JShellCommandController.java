package controllers;

import models.JShellCommand;
import utils.JShellExecutor;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class JShellCommandController{
    private final AtomicLong counter = new AtomicLong();
    @RequestMapping("/jshellCommand")
    public JShellCommand command(@RequestParam(value="command", defaultValue=" ") String command){
        JShellExecutor executor = new JShellExecutor();
        List<String> commandOutput = executor.evaluate(command);
        return new JShellCommand(counter.incrementAndGet(), commandOutput);
    }
}