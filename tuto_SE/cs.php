<?php
                   function redirect($url) {
                                ob_start();
                                header('Location: '.$url);
                                ob_end_flush();
                                die();
}
                  

                  if (isset($_POST['key'],$_POST['category'],$_POST['difficulty'])) {
                      //connect database
                      include('connect.php');
                      $key = $_POST['key'];
                      $k=strtolower($key);
                      $category = $_POST['category'];
                      $diff = $_POST['difficulty'];
                      
                      echo $diff;
                     
                     
                      
                      $query = "SELECT  *  FROM ".strtolower($category)." WHERE course_name LIKE '%".$k."%' AND course_diff ='".$diff."'";
                      $result = mysqli_query($dbcon,$query); 
                     
                      
                     $num_rows = mysqli_num_rows($result);
                      echo  $num_rows;
                      if ($num_rows == 0 or $k == NULL or $category == "0" or $diff == "0"){
                           redirect("error.html");
                      }
                      else{
                      $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
                     echo $row['lien'];

                  
                       
                       redirect($row['lien']);
                      }
                       unset($diff);
                       unset($category);
                      
                      
                  }
                  
                    
                      
                      
                 
 
                          
                  
                  
                  ?>