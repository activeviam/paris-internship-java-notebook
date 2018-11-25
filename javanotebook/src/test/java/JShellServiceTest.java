import org.junit.jupiter.api.Test;

import org.junit.runner.RunWith;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.services.JShellService;
import com.utils.JShellExecutor;

@RunWith(SpringRunner.class)
@SpringBootTest
public class JShellServiceTest {

    @Autowired
    JShellService jShellService;

    @Test
    public void testGetJse() {
        jShellService.createJse("0");
        JShellExecutor jse = jShellService.getJse("0");
        assertNotNull(jse);
    }
}