import org.junit.jupiter.api.Test;

import com.utils.JShellExecutor;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;
import com.models.CommandOutput;

public class JShellExecutorTest {
 
    @Test
    public void justAnExample() {
        System.out.println("This test method should be run");
    }

    @Test
    public void shouldInstanciate() {
        JShellExecutor jse = new JShellExecutor();
        assertNotNull(jse);
    }

    @Test
    public void shouldHandlePrintCommand() {
        JShellExecutor jse = new JShellExecutor();
        String input = "System.out.println(\"TEST\")";
        List<CommandOutput> result = jse.evaluateCommand(input);
        assertEquals(result.get(0).getOutput(), "TEST\n");
    }

    @Test
    public void shouldHandleVariables() {
        JShellExecutor jse = new JShellExecutor();
        String input = "int a = 4; int b = 6; System.out.println(a+b)";
        List<CommandOutput> result = jse.evaluateCommand(input);
        assertEquals(result.get(2).getOutput(), "10\n");
    }

    @Test
    public void shouldHandleFunctions() {
        JShellExecutor jse = new JShellExecutor();
        String input = "public void talk(){System.out.println(\"Hello\");}talk();";
        List<CommandOutput> result = jse.evaluateCommand(input);
        assertEquals(result.get(1).getOutput(), "Hello\n");
    }

    @Test
    public void shouldHandleFunctionWithParameter() {
        JShellExecutor jse = new JShellExecutor();
        String input = "public void sayHi(String name){"+
                            "System.out.println(\"Hello \" + name);"+
                        "}"+
                        "sayHi(\"Seb\");";
        List<CommandOutput> result = jse.evaluateCommand(input);
        assertEquals(result.get(1).getOutput(), "Hello Seb\n");
    }

    @Test
    public void shouldHandleBasicClass() {
        JShellExecutor jse = new JShellExecutor();
        String input = "public class TestClass{"+
                            "public void test(){ "+ 
                                "System.out.println(\"Hello\");"+ 
                            "}"+
                        "}"+ 
                        "TestClass test = new TestClass(); "+
                        "test.test();";
        List<CommandOutput> result = jse.evaluateCommand(input);
        assertEquals("VALID", result.get(0).getStatus());
        assertEquals(result.get(0).getOutput(), "");
        assertEquals("VALID", result.get(2).getStatus());
        assertEquals("Hello\n", result.get(2).getOutput());
    }

    @Test
    public void shouldHandleClassWithAttributes() {
        JShellExecutor jse = new JShellExecutor();
        String input = "public class TestClass{" + 
                            "public String a;" + 
                            "public TestClass(String a){" +
                                "this.a = a;" +
                            "}" + 
                        "}" +
                        "TestClass test = new TestClass(\"Hello\");" + 
                        "System.out.println(test.a);";
        List<CommandOutput> result = jse.evaluateCommand(input);
        assertEquals("VALID", result.get(0).getStatus());
        assertEquals("VALID", result.get(2).getStatus());
        assertEquals("Hello\n", result.get(2).getOutput());
    }

    @Test
    public void shouldHandleErrors(){
        JShellExecutor jse = new JShellExecutor();
        String input = "System.out.printl(hello);";
        List<CommandOutput> result = jse.evaluateCommand(input);
        assertEquals("REJECTED", result.get(0).getStatus());
        assertEquals("Error: cannot find symbol\n  symbol:   variable hello\n  location: class ", result.get(0).getOutput());
    }

    @Test
    public void shouldHandlePolymorphisme() {
        // on fait ou pas ?
    }

}

