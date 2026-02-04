/* 기본타입 */

import { extname } from "node:path";

let myName: string ="Gemini"; 
// : string : 문자열(텍스트)만 들어갈 수 있음
let myAge: number = 20;
// : number : 숫자만 들어갈 수 있음 (정수,실수 구분 없이 모두 Number)
let isLearning: boolean = true;
// : boolean : true(참) 아니면 false(거짓)만 가능

/*배열과 튜플*/

let hobbies: string[] = ["Sports","Cooking"];
// type[] : 특정 타입으로 이루어진 *배열 길이에 제한 x
//          배열: 문자열만 담긴 리스트
let address: [string,number] = ["서울시",12345];
// [type, type] : **튜플**이라고 부름 정해진 개수와 순서대로
// 타입이 들어와야 함   튜플: [문자(string),숫자(number)] 순서와 개수가 딱 맞아야 함

/*객체와 인터페이스*/

interface Student {
// interface : 객체의 설계도 어떤 속성이 있고 그게 어떤 타입인지 미리 약속
    readonly id: number; // 수정 불가
    // readonly : 읽기 전용 속성 : 한 번 정하면 값을 바꿀 수 없다
    name: string;
    age?: number; // 선택 사항 (없어도 됨)
    // ? : "있을 수도 있고 없을 수도 있다"라는 뜻
}

let student1: Student = {
    id: 1,
    name: "철수",
    age: 25
};

let student2: Student = {
    id: 1,
    name: "영희",
    // age가 없어도 에러가 안남
};

/*함수타입*/

// (a는 숫자, b는 숫자)를 받아서 반환하는 함수
function add(a: number, b: number): number {
    //       ---------  ---------
    // a,b는 매개변수(parameter): 함수에 들어가는 입력값
    return a + b;
    // return : 함수가 실행되고 나오는 결과값
}

add(10,20);
// 아규먼트 : 함수를 실제 실행할 때 전달하는 실제 값.

function printMessage(msg: string): void {
    // void :  아무것도 반환하지 않는 함수일 때 씀
    // 예: console.log 만 찍는 함수
    console.log(msg);
}

/* 유니온과 리터럴 */

// Union (|) : "A 혹은 B"를 뜻함
// Literal : 특정 문자열이나 숫자 자체를 타입으로 사용

// 유니온 : 숫자 혹은 문자열 가능
let code: number | string = 101;
code = "ABC";

// 리터럴 : 딱 이 값들 중 하나만 가져야 함
let direction: "left" | "right" | "up" | "down";
direction = "left";
// direction = "center"; // 에러가 뜸 정해진 4개 중에 없어서  

interface Car {
    brand: string;
    year: number;
}

const myCar: Car = {
    brand: "Hyundai",
    year: 2024
    // year에 문자열 "2024"를 넣을시
    /*'string' 형식은 'number' 형식에 할당할 수 없습니다.ts(2322)
    index.ts(74, 5): 필요한 형식은 여기에서 'Car' 형식에 선언된 'year' 속성에서 가져옵니다.*/
    //라는 오류가 뜸 왜냐면 year에는 number을 넣었는데 string을 넣었기 때문
};

interface Animal {
    name: string;
}

// Animal의 기능을 물려 받은 Dog 인터페이스
interface Dog extends Animal {
    //extends 상속/확장
    breed: String; // 견종 추가
}

const myDog: Dog = {
//const : 변수를 선언할때 쓰는 키워드
    name: "뭉치",
    breed: "골든 리트리버"
};

console.log(`${myDog.name}는 ${myDog.breed}야!`);
//console.log: 출력할때 쓰는 것


/* 배열(Array) 속에 객체(Object)를 담는 법*/

// 1. 데이터 설계

// 모든 상품의 공통 설계도
interface Product {
    id: number;
    name: string;
    price: number;
}

// 가전제품은 상품의 특징을 물려받고 '제조사'를 추가함
interface Electronics extends Product {
    manufacturer: string;
}

// 2. 객체를 배열에 담기

// Electronics 타입을 담는 배열을 선언 (const 사용)
const cart: Electronics[] = [
    {
        id: 1,
        name: "노트북",
        price: 1500000,
        manufacturer: "Apple"
    },
    {
        id: 2,
        name: "스마트폰",
        price: 100000,
        manufacturer: "Samsung"
    }
];

// 3. 데이터 꺼내서 확인

cart.forEach((item) => {
// forEach : 배열의 처음부터 끝까지 하나씩 꺼내서 일을 시키는 함수
// `` : 문자열 사이에 변수를 편하게 넣을 때 씀
    console.log(`${item.manufacturer}에서 만든 ${item.name}의 가격은 ${item.price}원 입니다`);
})