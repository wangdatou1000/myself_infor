package datou.record.myself_infor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @RequestMapping("/Hello")
    public String sayHello() {
        return "Hello,World! <br>11111100000ßß11";
    }
}