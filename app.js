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
        //---set is timing to default false ---//
        let $isTiming = false;
        if ($isTiming === false) {
            //--- new time starter ---//
            $startTime = new Date().valueOf();
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

            //---ad char ---//
            $charNum++;
            //---show next char ---//
            $charLetter = $sentence.substring($charNum, $charNum + 1);
            $('#target-letter').text($charLetter);
            


        }
    });

})