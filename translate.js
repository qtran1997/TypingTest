window.addEventListener('load', function(){
    var wordCount = 1;
    var string = "";
    var stringLength = 0;
    var letterIndex = 0;
    var timeStart = false;
    var time = 0;
    var wrongLetterCounter = 0;
    var caretPos;













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

    $('#english').on('click',function(){
        $('#keyboard').show();
        $('#keyboardRU').hide();
    });
    $('#russian').on('click',function(){
        $('#keyboard').hide();
        $('#keyboardRU').show();
    });
    $('#keyboard-button').on('click',function(){
        $("#container").toggle(); 
        $("#english").toggle();
        $("#russian").toggle();
    });
    $('.space').on('click', function(){
        //        console.log(' ');
        $('.text-box').text($('.text-box').text + " ");
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
    $('.delete').on('click', function(){
        console.log($('.text-box-wrapper').val());

        var $txt = jQuery(".text-box-wrapper");
        caretPos = $txt[0].selectionStart;
        var textAreaTxt = $txt.val();

        if(caretPos != 0)
            $txt.val(textAreaTxt.substring(0, caretPos-1) + textAreaTxt.substring(caretPos) );
        else
            $('.text-box-wrapper').val($('.text-box-wrapper').val().substr(0,$('.text-box-wrapper').val().length-1));
        
        caretPos--;
    });
    $('.return').on('click', function(){
        insertAtCursor("\n"); 
    });
    $('.key').on('click',function(){
        console.log(caretPos);
        var $txt = jQuery(".text-box-wrapper");
//        caretPos = $txt[0].selectionStart;
        var textAreaTxt = $txt.val();
        document.getElementsByClassName('text-box-wrapper')[0].focus();
        document.getElementsByClassName('text-box-wrapper')[0].setSelectionRange(caretPos, caretPos);
    })
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
            insertAtCursor(pressedKey.toUpperCase()); 
            if(shiftToggle == true)
            {
                shiftOff();
                shiftToggle = false;
            }
        }
        else
        {
            insertAtCursor(pressedKey.toLowerCase()); 
        }
    }
    function vKeyboardPressedSymbol(pressedKey,symbol)
    {
        if(shiftToggle == true)
        {
            insertAtCursor(pressedKey.substr(1,2)); 
            if(shiftToggle == true)
            {
                shiftOff();
                shiftToggle = false;
            }
        }
        else
        {
            insertAtCursor(pressedKey.substr(0,1)); 
        }
    }

    function resetLanguageListeners()
    {
        letterKeys = document.getElementsByClassName('letter');
        for(var i =0;i<letterKeys.length;i++)
        {
            //            letterKeys[i].removeEventListener('click', vKeyboardPressed);
            var clone = letterKeys[i].cloneNode();
            while (letterKeys[i].firstChild) {
                clone.appendChild(letterKeys[i].lastChild);
            }
            letterKeys[i].parentNode.replaceChild(clone, letterKeys[i]);
            letterKeys[i].addEventListener('click', vKeyboardPressed.bind(null,letterKeys[i].textContent));
        }
        symbolKeys = document.getElementsByClassName('symbol');
        for(var i =0;i<symbolKeys.length;i++)
        {
            var clone = symbolKeys[i].cloneNode();
            while (symbolKeys[i].firstChild) {
                clone.appendChild(symbolKeys[i].lastChild);
            }
            symbolKeys[i].parentNode.replaceChild(clone, symbolKeys[i]);
            //            symbolKeys[i].removeEventListener('click', vKeyboardPressedSymbol);
            symbolKeys[i].addEventListener('click', vKeyboardPressedSymbol.bind(null,symbolKeys[i].textContent,symbolKeys[i]));
        }
    }

    function insertAtCursor(character)
    {
        var $txt = jQuery(".text-box-wrapper");
        caretPos = $txt[0].selectionStart;
        var textAreaTxt = $txt.val();

        if(caretPos != 0)
            $txt.val(textAreaTxt.substring(0, caretPos) + character + textAreaTxt.substring(caretPos) );
        else
            $('.text-box-wrapper').val($('.text-box-wrapper').val() + character);
        caretPos++;
    }
});