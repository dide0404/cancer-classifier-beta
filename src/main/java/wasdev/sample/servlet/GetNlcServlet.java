package wasdev.sample.servlet;

import java.io.IOException;
import java.net.URLDecoder; 
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.ibm.watson.developer_cloud.natural_language_classifier.v1.NaturalLanguageClassifier;
import com.ibm.watson.developer_cloud.natural_language_classifier.v1.model.Classification;


/**
 * Servlet implementation class GetNlcServlet
 */
@WebServlet("/GetNlcServlet")
public class GetNlcServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    	String input = request.getParameter("inputtext");
    	String inputstr = URLDecoder.decode(input, "UTF-8");

    	NaturalLanguageClassifier service = new NaturalLanguageClassifier();
    	service.setUsernameAndPassword("88456ddd-9ce9-485e-99ec-83b97e492a8c", "e5aXyoChlHnN");

    	Classification classification = service.classify("ad940bx206-nlc-1685", inputstr).execute();

    	String outstr = classification.toString();
//    	response.setContentType("text/html");
    	response.setContentType("text/html; charset=UTF-8"); 
        response.getWriter().print(outstr);
        
    }
}
