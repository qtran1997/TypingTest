window.addEventListener('load', function(){
    $("#container").show(); 
    var wordCount = 1;
    var string = "";
    var stringLength = 0;
    var letterIndex = 0;
    var timeStart = false;
    var time = 0;
    var wrongLetterCounter = 0;
    callQuote();

    $('.text-box-wrapper').focus(function() {
        //        console.log(string);
        highlightLetter();
        $('.key').on('click',function(){
            if(timeStart == false)
            {
                timeStart = true;
                startTime();
            }
        });
        $('.text-box-wrapper').keypress(function(e){
            if(timeStart == false)
            {
                timeStart = true;
                startTime();
            }
            updateWPM();
            if(e.target == document.getElementsByClassName('text-box-wrapper')[0])
            {
                e.preventDefault();
            }
            colorLetter(e.keyCode);
            
            

            var key = document.getElementsByClassName('key');
            for(var i=0;i<key.length;i++)
            {
                if(key[i].innerText == String.fromCharCode(e.keyCode).toLowerCase())
                {
                    key[i].style.backgroundColor = "red";
                }
                if(String.fromCharCode(e.keyCode) == " ")
                {
                    $('.space').css('background','red');
                }
                if(e.which == 13)
                {
                    $('.return').css('background','red');
                }
                if(e.which == 65)
                {
                    $('.left-shift').css('background','red');
                    $('.right-shift').css('background','red');
                }
            }
        });
        $('.text-box-wrapper').keyup(function (e){

            var key = document.getElementsByClassName('key');
            for(var i=0;i<key.length;i++)
            {
                key[i].style.backgroundColor = "white";
            }
        });
    }).blur(function(){
        unhighlightLetter();
        $('.text-box-wrapper').off('keypress');
    });












    /////////KEYBOARD FUNCTIONALITY/////////
    var shiftToggle = false;
    var caps = false;

    var letterKeys = document.getElementsByClassName('letter');
    for(var i =0;i<letterKeys.length;i++)
    {
        letterKeys[i].addEventListener('click', vKeyboardPressed.bind(null,letterKeys[i].textContent));
    }
    var symbolKeys = document.getElementsByClassName('symbol');
    for(var i =0;i<symbolKeys.length;i++)
    {
        symbolKeys[i].addEventListener('click', vKeyboardPressedSymbol.bind(null,symbolKeys[i].textContent,symbolKeys[i]));
    }


    $('#keyboard-button').on('click',function(){
        $("#container").toggle(); 
    });
    $('.space').on('click', function(){
        //        console.log(' ');
        colorLetter(' '.charCodeAt(0));
    })
    $('.capslock').on('click', function() {
        if(caps == false)
        {
            caps = true;
            capsOn();
        }
        else
        {   
            caps = false;
            capsOff();
        }
    });
    $('.left-shift').on('click', function() {
        if(shiftToggle == false)
        {
            shiftOn();
            shiftToggle = true;
        }
        else
        {
            shiftOff();
            shiftToggle = false;
        }
    });
    $('.right-shift').on('click', function() {
        if(shiftToggle == false)
        {
            shiftOn();
            shiftToggle = true;
        }
        else
        {
            shiftOff();
            shiftToggle = false;
        }
    });

    function capsOn()
    {
        for(var i =0;i<letterKeys.length;i++)
        {
            letterKeys[i].textContent = letterKeys[i].textContent.toUpperCase();
        }
    }
    function capsOff()
    {
        for(var i =0;i<letterKeys.length;i++)
        {
            letterKeys[i].textContent = letterKeys[i].textContent.toLowerCase();
        }
    }
    function shiftOn()
    {
        $('.on').show();
        $('.off').hide();
        for(var i =0;i<letterKeys.length;i++)
        {
            letterKeys[i].textContent = letterKeys[i].textContent.toUpperCase();
        }

    }
    function shiftOff()
    {
        $('.on').hide();
        $('.off').show();
        for(var i =0;i<letterKeys.length;i++)
        {
            letterKeys[i].textContent = letterKeys[i].textContent.toLowerCase();
        }
    }
    function vKeyboardPressed(pressedKey)
    {
        if(shiftToggle == true || caps == true)
        {
            colorLetter(pressedKey.toUpperCase().charCodeAt(0));
            //            console.log(pressedKey.toUpperCase());
            if(shiftToggle == true)
            {
                shiftOff();
                shiftToggle = false;
            }
        }
        else
        {
            colorLetter(pressedKey.toLowerCase().charCodeAt(0));
            //            console.log(pressedKey.toLowerCase());
        }
    }
    function vKeyboardPressedSymbol(pressedKey,symbol)
    {
        if(shiftToggle == true)
        {
            colorLetter(pressedKey.substr(1,2).charCodeAt(0));
            //            console.log(pressedKey.substr(1,2));
            if(shiftToggle == true)
            {
                shiftOff();
                shiftToggle = false;
            }
        }
        else
        {
            colorLetter(pressedKey.substr(0,1).charCodeAt(0));
            //            console.log(pressedKey.substr(0,1));
        }
    }


    /////////TEXTBOX FUNCTIONALITY//////////
    function colorLetter(key)
    {
        //        console.log(letterIndex);
        if(letterIndex+1 > stringLength-1)
        {
            $('#keyboard-button').hide();
            $('#container').hide();
            //                        alert("Time: " + time +"\n Word Count: "+(wordCount));
            timeStart = false;
            $('.text-box-wrapper').fadeOut();
            $('#stats').animate({
                padding: '20px',
                marginTop: '+=150px', 
                color: 'green',
                backgroundColor:'white',
                borderWidth: '4px',
            }, 750);
            $('.text-box-wrapper').off('keypress');
            $('.key').off('click');
            $('.left-shift').off();
            $('.right-shift').off();
            $('.capslock').off();
            $('.space').off();
            for(var i =0;i<letterKeys.length;i++)
            {
                letterKeys[i].removeEventListener('click', vKeyboardPressed);
            }
            for(var i =0;i<symbolKeys.length;i++)
            {
                symbolKeys[i].removeEventListener('click', vKeyboardPressedSymbol);
            }


            return;
        }
        var markLetter = markElements[letterIndex].innerText;
        wordCount = string.substr(0,letterIndex).split(" ").length;
        //        console.log(wordCount);


        if(key == markLetter.charCodeAt(0) || (markLetter.length ==0 && key == " ".charCodeAt(0)))
        {markElements[letterIndex].style.backgroundColor = "green";
         markElements[letterIndex].style.color = "white";

        }
        else
        {
            wrongLetterCounter++;
            markElements[letterIndex].style.backgroundColor = "red";
            markElements[letterIndex].style.color = "white";
        }
        var accuracy = ((((letterIndex+1-wrongLetterCounter)/(letterIndex+1)))*100);
        $("#accuracy").text("Accuracy: "+accuracy.toFixed(2)+"%");
        //        console.log("Accuracy: "+((((letterIndex+1-wrongLetterCounter)/(letterIndex+1)))*100).toFixed(2));
        letterIndex++;
        highlightLetter();
    }
    function startTime()
    {
        if(timeStart == false)
        {
            return;
        }
        updateWPM();
        time+=1;
        setTimeout(startTime,1000);
        //        console.log(time);
    }
    function callQuote()
    {
        $.ajax({
            url: "https://api.forismatic.com/api/1.0/?",
            dataType: "jsonp",
            data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
            success: function( response ) {
                string = response.quoteText;
                string = string.trim();
                var arr =  string.split("");
                var length = arr.length;
//                console.log("API CALL LENGTH: "+length);
                stringLength = length;
                arr = arr.map(markSpan);
                //                console.log(arr);
                var newText = arr.join("");
                $('#text-box').html(newText);
                for(var i=0;i<length;i++)
                {
                    if(document.getElementsByTagName('mark')[i].innerText.length == 0) 
                    {
                        document.getElementsByTagName('mark')[i].style.width = "20px !important"; 
                        document.getElementsByTagName('mark')[i].style.minWidth = "20px !important";
                    }
                    document.getElementsByTagName('mark')[i].style.backgroundColor = "white";
                }
                document.getElementById('text-box').innerHtml += newText;
            },
            failure: function (){
                alert("failure");
            }
        }); 
    }
    function highlightLetter()
    {
        for(var i=letterIndex;i<stringLength;i++)
        {
            document.getElementsByTagName('mark')[i].style.backgroundColor = "#EEEEEE";
        }
        $('.text-box-wrapper:first').css('backgroundColor','#EEEEEE');
        markElements = document.getElementsByTagName('mark');

        markElements[letterIndex].style.backgroundColor = "tan";
    }
    function unhighlightLetter()
    {
        for(var i=letterIndex;i<stringLength;i++)
        {
            document.getElementsByTagName('mark')[i].style.backgroundColor = "#FFFFFF";
        }
        $('.text-box-wrapper:first').css('backgroundColor','#FFFFFF');
        markElements = document.getElementsByTagName('mark');

        markElements[letterIndex].style.backgroundColor = "white";
    }
    function markSpan(value)
    {
        return "<mark>" + value + "</mark>";
    }
    function updateWPM()
    {
        if(time >0)
        {
            var wpm = wordCount*60/time;
            $('#wpm').text(Math.round(wpm)+" wpm");
        }
    }
});