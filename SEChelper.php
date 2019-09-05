<?php
    $name = $_GET['cname'];
    $kw = $_GET['kw'];

    $keywords = explode(',',str_replace(array(";"),',',str_replace(array("_"),' ',$kw)));
    $startd = $_GET['startdate'];
    $endd = $_GET['enddate'];
                 
    unset($out);
    unset($res);

    exec("python py/main.py {$name} {$kw} {$startd} {$endd}",$out, $res);

    echo "<br>";
    if($out[0] == '101' && $res == 0)
    {
        echo "<div class='result-p'><p><b>Query Company: </b>&nbsp&nbsp".$_GET['cname']."</p></div>";
                            
        echo "<div class='result-p'><p><b>Error:</b> Failed to find the company '$name'!</p></div>";
    }
    elseif($out[0] == '102' && $res == 0)
    {
        echo "<div class='result-p'><p><b>Query Company: </b>&nbsp&nbsp".$_GET['cname']."</p></div>";
                            
        echo "<div class='result-p'><p><b>Query period: </b>&nbsp&nbsp From &nbsp".$startd."&nbsp to &nbsp".$endd."</p></div>";
                            
        echo "<div class='result-p'><p><b>Error:</b> Failed to find the company's S-1/A form within this period!</p></div>";
    }
    elseif($out[1] == '103' && $res == 0)
    {
        echo "<div class='result-p'><p><b>Query Company: </b>&nbsp&nbsp".$_GET['cname']."</p></div>";
                            
        echo "<div class='result-p'><p><b>Query period: </b>&nbsp&nbsp From &nbsp".$startd."&nbsp to &nbsp".$endd."</p></div>";
                            
        echo "<div class='result-p'><p>S-1/A Form successfuly found: <a href='temp/s-1A/$out[0]' target='_blank'>$out[0]</a></p></div>";
                            
        echo "<div class='result-p'><p><b>Query keywords: </b>&nbsp&nbsp".$_GET['kw']."</p></div>";
                            
        echo "<div class='result-p'><p><b>Error:</b> Failed to find sentences with input keywords!</p></div>";
    }
    elseif($res == 0)
    {
        $txtname = generate_txt($out);
                            
        echo "<div class='result-p'><p><b>Query Company: </b>&nbsp&nbsp".$_GET['cname']."</p></div>";
                            
        echo "<div class='result-p'><p><b>Query period: </b>&nbsp&nbsp From &nbsp".$startd."&nbsp to &nbsp".$endd."</p></div>";
                            
        echo "<div class='result-p'><p><b>S-1/A Form successfuly found: </b>&nbsp&nbsp<a href='$out[0]' target='_blank'>$out[0]</a></p></div>";
                            
        echo "<div class='result-p'><p><b>Query keywords: </b>&nbsp&nbsp".$_GET['kw']."</p></div>";
                            
        echo "<div class='result-p'><p><b>Sentences with keywords within the form: </b>&nbsp&nbsp<a href='temp/txt/$txtname' download='$txtname'>Download the sentences as txt file</a></p></div>";
        
        for ($i=1;$i<count($out);++$i)
        {
            echo "<div class='result-p'><p class='records'>".str_replace($keywords, array_map(highlight, $keywords), $out[$i])."</p></div>";
        }
    }
                    
    function generate_txt($content){
        $txtname = $_GET["cname"] .".txt";
        $myfile = fopen("C:/AppServ/MySites/Dashboard/temp/txt/".$txtname, "w") or die("Unable to open file!");
        $content = array_slice($content,1);
        $txt = "";
        foreach($content as $s){
            $txt = $txt . $s . "\n\n";
        }
        fwrite($myfile, $txt);
        fclose($myfile);
        return $txtname;
    }

    function highlight($w){
        return "<font style='background:yellow'><b>$w</b></font>";
    }
?>