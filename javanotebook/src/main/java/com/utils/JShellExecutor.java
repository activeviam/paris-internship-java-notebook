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
import com.models.Documentation;
import com.models.Variable;

import jdk.jshell.Diag;
import jdk.jshell.JShell;
import jdk.jshell.SnippetEvent;
import jdk.jshell.SourceCodeAnalysis;
import jdk.jshell.Snippet;
import jdk.jshell.VarSnippet;
import jdk.jshell.ImportSnippet;


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


	/**
	 * Evaluate the result of a block of java code
	 * @param input
	 * @return the result of the code's execution
	 */
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


	/**
	 * Provide the user with suggestions based on the current java environment
	 * @param input the user's current line of code
	 * @param cursor the position of the user's cursor in this line
	 * @return a list of suggestions for the user
	 */
	public Set<String> codeAutoCompletion(String input, int cursor) {
		// SourceCodeAnalysis.CompletionInfo completeness = jshell.sourceCodeAnalysis().analyzeCompletion(input);
		List<SourceCodeAnalysis.Suggestion> suggestions = jshell.sourceCodeAnalysis().completionSuggestions(input, cursor, new int[1] );
		// System.out.println(completeness.completeness());
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
	 * Generate the javadoc for the autocompletion suggestions
	 * @param input: the user's curent line of code
	 * @param suggestions: the suggestions the jshell has generated
	 * @return a list of the documentation objects for each suggestion
	 */
	public List<Documentation> generateJavaDoc(String input, List<String> suggestions){
		String reverseInput = new StringBuilder(input).reverse().toString();
		String splitInput[] = reverseInput.split("\\.", 2);
		if (splitInput.length > 1){
			input = new StringBuilder(splitInput[1]).reverse().toString();
			for (int i=0; i< suggestions.size(); i++){
				suggestions.set(i, input + "." + suggestions.get(i) + ")");
			}
		}
		List<Documentation>documentation = new ArrayList<>();
		for (String suggestion: suggestions) {
			List<SourceCodeAnalysis.Documentation> docList = jshell.sourceCodeAnalysis().documentation(suggestion, suggestion.length(), false);
			if (docList.size() > 0) {
				SourceCodeAnalysis.Documentation doc= jshell.sourceCodeAnalysis().documentation(suggestion, suggestion.length(), true).get(0);
				documentation.add(new Documentation(doc.signature(), doc.javadoc()));
			}
			else {
				documentation.add(null);
			}
		}
		return documentation;
	}


	/**
	 * Returns the list of variables which have been created in the current java environment
	 */
	public List<Variable> currentVariables(){
		List<Variable> variables = new ArrayList<>();
		Snippet[] snippets = jshell.snippets().toArray(Snippet[]::new);
		for (Snippet snip: snippets){
			if (snip.kind() == jdk.jshell.Snippet.Kind.VAR && jshell.status(snip).isActive()) {
				VarSnippet variable = (VarSnippet) snip;
				CommandOutput valueOutput = this.evaluateCommand("System.out.println(" + variable.name() + ");").get(0);
				variables.add(new Variable(variable.typeName(),variable.name(), valueOutput.getOutput()));
			}
		}
		return variables;
	}

	/**
	 * Returns the list of active imports in the current java environment
	 */
	public List<String> currentImports() {
		List<String> imports = new ArrayList<>();
		Snippet[] snippets = jshell.snippets().toArray(Snippet[]::new);
		for (Snippet snippet: snippets) {
			if (snippet.kind() == jdk.jshell.Snippet.Kind.IMPORT && jshell.status(snippet).isActive()) {
				ImportSnippet importSnippet = (ImportSnippet) snippet;
				imports.add(importSnippet.fullname());
			}
		}
		return imports;
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