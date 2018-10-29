import org.junit.jupiter.api.Test;

import utils.JShellExecutor;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;

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
        List<String> resultat = jse.evaluate(input);
        assertEquals(resultat.get(0), "TEST\n");
    }

    @Test
    public void shouldHandleVariables() {
        JShellExecutor jse = new JShellExecutor();
        String input = "int a = 4; int b = 6; System.out.println(a+b)";
        List<String> resultat = jse.evaluate(input);
        assertEquals("10", resultat.get(0));
    }
}