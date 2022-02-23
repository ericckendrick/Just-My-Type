//---Display sentences in array one at a time in sentence <div>---//
let $sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
//---Start arr counter at 0----//
let $sentenceIdx = 0;
//---Var for sentence at idx position -----//
let $sentence = $sentences[$sentenceIdx];
//----Current sentence displayed ------//
$('#sentence').text($sentence);
//----- Start character counter at 0 -----//
let $charNum = 0;
//---Var for character at sentence substring with idx end at +1 ---//
let $charLetter = $sentence.substring($charNum, $charNum + 1) ;
//--set yellow block div to var and set its position to 0 for px index pos --//
let $highlightBlock = $('#yellow-block');
let $highlightPos = 0;
let $startDate;
let $startTime;
 //---set is timing to default false ---//
let $isTiming = false;
let $mistakesNum = 0;

$(document).ready(function() {
    //--- hide upper keyboard---//
    $('#keyboard-upper-container').hide();

    //---While shift key is held down, hide lowercase &  show upper
    $(document).keydown(function(e) {
        if (e.keyCode === 16) {
            $('#keyboard-lower-container').hide();
            $('#keyboard-upper-container').show();
        }
    });
    //--Shift key up, thang down flip it and reverse it ----//
    $(document).keyup(function(e) {
        if (e.keyCode === 16) {
            $('#keyboard-lower-container').show();
            $('#keyboard-upper-container').hide();
        }
    });

    //-----Highlight the pressed key with .keypress() & .css()----//
    $(document).keypress(function(e) {
        //---set variable to pressed key event with .which prop --//
        let $key = $(`#${e.which}`);
       $($key).css('background-color', 'yellow');

       //----Keyup to undo highlight/ return key background color to previous color----//
    $(document).keyup(function() {
        $($key).css('background-color', '#f5f5f5');
        });
    });

    //---Display current expected letter w/ target-letter div ---//
    $('#target-letter').text($charLetter);

    //---Keypress function for wpm calc and correct/incorrect key --//
    $(document).keypress(function(e) {
        if ($isTiming == false) {
            //--- new time starter ---//
            $startDate = new Date();
            $startTime = $startDate.valueOf();
            //---- set to true ---//
            $isTiming = true;
        }
        //--- If correct key is pressed ---//
        if (e.which === $sentences[$sentenceIdx].charCodeAt($charNum)) {
            //-- var to add ok glyphicon and append to feedback div --- //
            let $okay = ('<span class="glyphicon glyphicon-ok"></span>');
            $($okay).appendTo('#feedback');

            //---add px value to move block from left margin --//
            $highlightPos += 17;
            $($highlightBlock).css('margin-left', `${$highlightPos}px`);

            //---add char ---//
            $charNum++;
            //---show next char ---//
            $charLetter = $sentence.substring($charNum, $charNum + 1);
            $('#target-letter').text($charLetter);
            
            //---If statement for complete sentence ---//
            if ($charNum === $sentence.length) {
                $sentenceIdx ++;
                //---if all have been completed, end time and calc wpm --//
                if ($sentenceIdx === $sentences.length) {
                    let $endDate = new Date();
                    let $endTime = $endDate.valueOf();
                    let $min = ($endTime - $startTime) / 60000;
                    //---wpm calculations ----//
                    $wpm = Math.round(54 / $min -2 * $mistakesNum);

                    //---Use confirm method to display the result and reload page on confirm ---//
                    
                    
                    let confirmAlert = confirm(`You completed the exercise at ${$wpm} words per minute. Try Again?`);
                    if (confirmAlert === true) {
                        location.reload();
                    };
                }
                //-------If not at end of sentence array, go to next sentence ---//
                else {
                    $sentence = $sentences[$sentenceIdx];
                    $('#sentence').text($sentence);
                    //-------reset character for new sentence------//
                    $charNum = 0;
                    $charLetter = $sentence.substring($charNum, $charNum + 1);
                    //-----add next target letter text -------//
                    $('#target-letter').text($charLetter);

                    //----put highlight block on first letter of new sentence ---//
                    $highlightPos = 0;
                    $($highlightBlock).css('margin-left', `${$highlightPos}px`);
                    //----reset feedback text --------//
                    $('#feedback').text("");
                };
            };
        }
        else {
        //----Else to capture and display mistakes --------//
        let $incorrectKey = ('<span class="glyphicon glyphicon-remove"></span>');
        $('#feedback').append($incorrectKey);

        $mistakesNum ++;
        }
    });

});