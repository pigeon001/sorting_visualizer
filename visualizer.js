var inputArray=[];
// = [23, 54, 85, 120, 354, 121, 48, 321,88,56,422,787,12,78];
 
//taking variable animation time
var anim_time;
let slider = document.getElementById('animTime');
let maximum = slider.getAttribute('max');
anim_time=maximum/2;
slider.addEventListener('input', (eve) => {
    anim_time = maximum - eve.target.value+0.1;
    console.log(anim_time);
});

//responsiveness of array cells
['load', 'resize'].forEach(element => {
    window.addEventListener(element, () => {
      cell_width();
    }, false);
});




//setting width of individual cell according to screen width
function cell_width() {
    let main_width = $('.main').width();
    // console.log(main_width);
    let cell_width = main_width / inputArray.length;
    // let cell_width = main_width / array.length;
    $('.cell').css('--width', `${cell_width}px`);
    $('.cell').css('--large', `${cell_width * 2}%`);
    return cell_width;
}



//getting individual element from array inputArray for displaying it 

function display(array) {
    document.getElementById('main').innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        let cell = document.createElement('div');
        let para = document.createElement('p');
        cell.className = 'cell';
        cell.id = i;
        para.textContent = array[i];
        cell.appendChild(para);
        // cell.textContent=inputArray[i];
        let main = document.getElementById('main');
        main.appendChild(cell);
    }
}


//function to change corresponding elements;
function change(idL, idR) {
    let xL = document.getElementById(`${idL}`);
    let xR = document.getElementById(`${idR}`);
    let Cwidth = cell_width();

    // console.log('change'+String(Cwidth));
    let shift = Math.abs(idL - idR) * Cwidth;


    // let inXL=xL.offsetLeft; //coordinates of left cell
    // let inYL=xL.offsetHeight;
    // let inXR=xR.offsetLeft; //coordinates of left cell
    // let inYR=xR.offsetHeight;
    $(`#${idR}`).css('--inXL', `-${shift}px`); //interchanging coordinates
    // $(`#${idR}`).css('--inYL',`-${inYL}px`);
    $(`#${idR}`).css('animation', `toLeft ${anim_time}s linear 0s`);

    $(`#${idL}`).css('--inXR', `${shift}px`); //interchanging coordinates
    // $(`#${idL}`).css('--inYR',`${inYR}px`); 
    $(`#${idL}`).css('animation', `toRight ${anim_time}s linear 0s`);



    setTimeout(() => {
        //interchanging the values    
        let leftValue = $(`#${idL}`).text();
        let rightValue = $(`#${idR}`).text();
        // console.log(`${leftValue}`);
        // console.log(`${rightValue}`);
        $(`#${idL}`).html(`<p>${rightValue}</p>`);
        $(`#${idR}`).html(`<p>${leftValue}</p>`);

        //removing properties that is setting to default
        let leftCell = document.getElementById(idL);
        leftCell.style.removeProperty('--inXR');
        leftCell.style.removeProperty('animation');

        let rightCell = document.getElementById(idR);
        rightCell.style.removeProperty('--inXL');
        rightCell.style.removeProperty('animation');
    },
        anim_time * 1000 - 10); // set the timeout nearly equivalent to delay+animation time
}

function showSorted(i, j) {
    for (let k = i; k <= j; k++) {
        $(`#${k}`).css('background-color', 'rgb(5, 245, 25)');
    }
}

async function bubbleSort(a) {
    // let new_time=anim_time;
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {
            if (a[j] > a[j + 1]) {
                change(j, j + 1);
                await new Promise(resolve => setTimeout(resolve, anim_time * 1000));

                let temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;

                // setTimeout(change,new_time, left_id, right_id);
                // setTimeout(function(){new_time+=anim_time},new_time-10);
                // console.log('set');
            }
        }
        showSorted(a.length - i - 1, a.length);
    }
}


async function selectionSort(a) {
    for (let i = 0; i < a.length; i++) {
        let min = a[i];
        let loc = -1;
        for (let j = i + 1; j < a.length; j++) {
            if (min > a[j]) {
                min = a[j];
                loc = j;
            }
        }
        if (loc != -1) {
            change(i, loc);
            await new Promise(resolve => setTimeout(resolve, anim_time * 1000));

            let temp = a[i];
            a[i] = a[loc];
            a[loc] = temp;
        }
        showSorted(0, i);
    }

}


async function insertionSort(a) {
    for (i = 1; i < a.length; i++) {
        temp = a[i];
        for (j = i - 1; j >= 0 && a[j] > temp; j--) {
            change(j, j + 1);
            await new Promise(resolve => setTimeout(resolve, anim_time * 1000));
            
            a[j + 1] = a[j];
        }
        // await new Promise(resolve=> setTimeout(resolve,anim_time*1000));
        // change(a.indexOf(temp),j+1);
        a[j + 1] = temp;
        setTimeout(showSorted, anim_time, 0, i);
    }
}



// change(1,6);
// interChange();
// function interChange(){
//     for(let i=0;i<inputArray.length-1; i++){
//         let temp=inputArray[i];
//         inputArray[i]=inputArray[i+1];
//         inputArray[i+1]=temp;
//         setTimeout(change,i*1000*anim_time, i, i+1);
//     }
// }



//displaying 
// display();




// bubbleSort(inputArray);
// selectionSort(inputArray);
// insertionSort(inputArray);
// showSorted(0,inputArray.length);

///form submit event
let form = document.getElementById('form');
form.addEventListener('submit', (sub) => {
    sub.preventDefault();
    let algo = $('#opt').val();
    // anim_time=$('#animTime').val();
    let textArea = document.getElementById('array');
    inputArray = textArea.value.trim().split(/[\s,|@]+/g); //spliting different values
    //checking & converting input to numbers
    console.log(inputArray);
    console.log(algo);
    console.log(anim_time);

    for (let x of inputArray) {
        if (isNaN(x)) return window.alert('enter valid numbers');
    }

    inputArray = inputArray.map((ele) => Number(ele));

    if (inputArray.length <= 4) {
        window.alert('Enter minimum 5 numbers to see result');
    }
    else if (algo == '') { window.alert('Select a sorting algorithm!'); }
    else {
        $('#main').css('display', 'block');
        display(inputArray);
        if($('#main').width()<400 & window.innerHeight>window.innerWidth){
            $('.watermark').css('display','flex');
            setTimeout(()=>{$('.watermark').css('display','none');},
            2000);
        }
        cell_width();
        
        // $('#array').val('');
        if (algo == 'bubble') bubbleSort(inputArray);
        else if (algo == 'selection') selectionSort(inputArray);
        else if (algo == 'insertion') insertionSort(inputArray);
    }

})

