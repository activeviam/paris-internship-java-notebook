package com.utils;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import java.util.HashSet;
import java.util.Set;

import com.models.CommandOutput;

import jdk.jshell.Diag;
import jdk.jshell.JShell;
import jdk.jshell.SnippetEvent;
import jdk.jshell.SourceCodeAnalysis;


public class JShellExecutor {
	
	/** The UTF-8 encoding */
	public static final String UTF8 = "UTF-8";

    private ByteArrayOutputStream baosOut = new ByteArrayOutputStream();
	/** The underlying jshell */
    private JShell jshell;

	/**
	 * Constructor of {@link JShellExecutor}.
	 */
    public JShellExecutor() {
        try {
           final PrintStream outstream = new PrintStream(baosOut, true, UTF8);
           jshell = JShell.builder().out(outstream).build();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public List<CommandOutput> evaluateCommand(String input){
            String content = input;
            final List<SnippetEvent> events = new ArrayList<>();
            final List<CommandOutput> output = new ArrayList<>();
            while (true) {
                final SourceCodeAnalysis.CompletionInfo an = jshell.sourceCodeAnalysis().analyzeCompletion(content);
                if (!an.completeness().isComplete()) {
                    break;
                }
                for(SnippetEvent event: jshell.eval(trimNewlines(an.source()))){
                    events.add(event);
                    output.add(createCommandOutput(event));
                }
                if (an.remaining().isEmpty()) {
                    break;
                }
                content = an.remaining();
            }
		return output;
	}

	public Set<String> codeAutoCompletion(String input, int cursor) {
		SourceCodeAnalysis.CompletionInfo completeness = jshell.sourceCodeAnalysis().analyzeCompletion(input);
		List<SourceCodeAnalysis.Suggestion> suggestions = jshell.sourceCodeAnalysis().completionSuggestions(input, cursor, new int[1] );
		System.out.println(completeness.completeness());
		List<String> autocompletion = new ArrayList<String>();
		for (SourceCodeAnalysis.Suggestion suggestion: suggestions) {
			autocompletion.add(suggestion.continuation());
		}
		for (int i = 0; i < autocompletion.size(); i++) {
			autocompletion.set(i, autocompletion.get(i).trim());
		}
		HashSet<String> hs = new HashSet<String>(autocompletion);
		return hs;
	}


	/**
	 * Creates the command output from the event.
	 *
	 * @param event the event
	 * @return the command output
	 */
	private CommandOutput createCommandOutput(SnippetEvent event) {
		final CommandOutput co = new CommandOutput();
		co.setStatus(event.status().toString());
		co.setCommand(event.snippet().source());
		try {
		    switch (event.status()){
		        case VALID:
					final String rep = new String(baosOut.toByteArray(), UTF8);
		            co.setOutput(rep);
		            break;
		        case REJECTED:
		        	final String rejectedErrorText = jshell.diagnostics(event.snippet())
						.findFirst()
						.get()
						.getMessage(Locale.ENGLISH);
		            co.setOutput("Error: " + rejectedErrorText);
		            break;
		        case OVERWRITTEN:
		            co.setOutput("Overwritten class");
		            break;
		        default:
					final Diag diagnostic = jshell.diagnostics(event.snippet()).findFirst().get();
					if (diagnostic.isError()) {
		                co.setStatus("ERROR");
		            }
		            else {
		                co.setStatus("WARNING");
		            }
					co.setOutput("Error: " + diagnostic.getMessage(Locale.ENGLISH));
		            break;
		    }
		    baosOut.reset();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return co;
	}

    /**
     * Removes the new lines at the beginning and end of the string.
     *
     * @param s the string to trim
     * @return the trimmed string
     */
    private String trimNewlines(String s) {
        int b = 0;
        while (b < s.length() && s.charAt(b) == '\n') {
            ++b;
        }
        int e = s.length() -1;
        while (e >= 0 && s.charAt(e) == '\n') {
            --e;
        }
        return s.substring(b, e + 1);
    }
}