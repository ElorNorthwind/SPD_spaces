console.log("hello world")

const input_box = document.getElementById('input-box');
const output_box = document.getElementById('output-box');
const convert_button = document.getElementById('convert');

convert_button.addEventListener('click', ReplaceSpaces);

function ReplaceSpaces() {
    let contents = input_box.value;
    contents = contents.replace(/^[ \t]*(?:\d+\.[ \t]+)?|[ \t]+$|[ \t]+(?=[ \t])/gm, ""); //Трим пробелов и нумерации
    contents = contents.replace(/(?<=\d)( )(кв\.)( )?(м)/g, "^$2^$4"); //Кв.м
    contents = contents.replace(/([Гг](?:ор)?(?:од)?а?\.?|(?<=["«])[Оо]б?|№|[Чч](?:аст)?ь?[ию]?\.?|[Сс]т(?:ат)?ь?и?(?:ей)?\.?)( )/g, "$1^"); //Правила ДО
    contents = contents.replace(/([а-я]\.|[Оо]т)( )([\dА-Я])/g, "$1^$3"); //Правила ДО и ПОСЛЕ - общие
    contents = contents.replace(/([А-Я][а-я]+)( )(ул|шо?\.?|п\-?[рд\.])/g, "$1^$3"); //Правила ДО и ПОСЛЕ - наименование улицы после имя собственного
    contents = contents.replace(/([Уу]лица|[Шш](?:ос)?(?:се)?.?|[Пп]\-д|[Пп]р(?:оезд)?(?:оросп)?(?:ект)?\.?)( )([А-Я\d])/g, "$1^$3"); //Правила ДО и ПОСЛЕ - наименование улицы до имя собственного
    contents = contents.replace(/( )(г\.р\.|\d{2}\:\d{2})/g, "^$2"); //Правила ПОСЛЕ
    contents = contents.replace(/([\dА-Я)])(-)([\dА-Я(])/g, "$1~$3"); //Тильды

    output_box.value = contents;

    output_box.select();
    document.execCommand('copy');

}