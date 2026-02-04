/* 제네릭 */

// <T> : 제네릭을 상징하는 기호 T는 관습적으로 Type의 약자

// Reusability : 똑같은 로직이지만 타임만 다를때 , 코드를 여러번
// 복사해서 붙여넣지 않아도 되게 함

// Flexibility : 어떤 타입이 들어올지 미리 정하지 않고, 사용하지 않는
// 순간에 타입을 결정함

// <T>는 어떤 타입이 들어올지 나중에 결정한다 라는 뜻
function wrapInArray<T>(item: T): T[] {
    return [item];
}

// 사용할 때 타입을 정함
const stringArray = wrapInArray<string>("안녕"); // T가 string이 됨
const numberArray = wrapInArray<number>(12345); // T가 number가 됨

console.log(stringArray);
console.log(numberArray);

/* 2. 인터페이스와 제네릭의 만남 */

// 실무에서 많이 쓰는 방식 API 응답 데이터 같은 걸 만들 때 필수

//데이터를 감싸는 봉투 만들기
interface ResponseBox<T> {
    status: number;
    data: T; // 데이터의 형태는 나중에 정함
}

// 1. 숫자를 담는 응답
const scoreResponse: ResponseBox<number> = {
    status: 200,
    data: 100 // T에 number가 담김
};

// 2. 아까 만든 Car 객체를 담는 응답
const carResponse: ResponseBox<Car> ={
    status: 200,
    data : {
        brand: "Tesla",
        year: 2024
    }
};

console.log(carResponse.data.brand);

/* 제네릭을 활용한 코드 짜기*/

// 1. 제네릭 함수 정의
function 로그및반환<T>(list: T[]): T[] {
    // T[]: T 타입으로 이루어진 배열

    // (list: T[]): 파라미터(매개변수)부분임 T타입으로 이루어진
    // 배열을 받겠다 라는 뜻
    // : T[] :반환타입 입력받은 것과 똑같은 타입의 배열을 다시 돌려준다 라는 뜻
    console.log(`이 배열의 길이는 ${list.length}개 입니다.`);
    return list;
}

// 2. 숫자 배열에 사용해보기
const 숫자결과 = 로그및반환<number>([10,20,30]);

// 3. 아까 만든 Car 객체 배열에 사용해보기
const 자동차결과 = 로그및반환<Car>([
    { brand: "Kia", year: 2023 },
    { brand: "BMW", year: 2024 }
]);

console.log("첫 번째 자동차 브랜드:", 자동차결과[0]?.brand);

/* 많이 쓰는 유틸리티 타입 */

interface User {
    id: number;
    name: string;
    age: number;
    email: string;
}

/* Partial<T> (전부 선택사항으로) */
// 설명: 원래 인터페이스의 모든 속성 뒤에 ?를 붙인 것 처럼 만듦
// 언제쓰냐: 사용자 정보를 수정할때, 이름만 바꾸거나 나이만 바꾸고 싶을때 유용함

// 모든 속성이 age?, name? 처럼 변함
const updateData: Partial<User> = {
    age : 21 // name, email이 없어도 에러가 안남
};

/* Pick<T, Keys> (원하는 것만 쏙) */
// 설명: 인터페이스에서 필요한 속성만 골라서 새로운 타입을 만듦
// 언제쓰냐: 게시글 목록 화면에서 '제목'과'작성자'만 보여주고 싶을때 사용함

// User에서 'id'와 'name'만 골라서 씀
const simpleProfile: Pick<User, "id" | "name"> = {
    id: 1,
    name: "철수"
};

/* Omit<T, Keys> (이것만 빼고 다) */
// 설명: 인터페이스에서 특정 속성만 제외하고 나머지를 다 가져옴.
// 언제쓰냐: 회원가입 시 '아이디(id)'는 서버에서 자동 생성하니, 입력 단계에서는
// id만 빼고 싶을때 씀

// User에서 'id'만 빼고 나머지(name, age, email) 다 가져옴
const newUser: Omit<User, "id"> = {
    name: "영희",
    age : 25,
    email: "young@test.com"
};

interface Car{
    brand: string;
    year: number;
}

// 미션 1: Car의 모든 속성을 선택 사항으로 만드는 'PartialCar' 타입을 써서 변수 만들기
const someCar: Partial<Car> = {
    brand: "kia"
};

// 미션 2: Car에서 year만 쏙 빼고 brand만 가지는 객체 만들기
const brandOnly: Omit<Car,"year"> = {
    brand: "Tesla"
};

console.log(someCar,brandOnly);


/* 클래스 (Class) */

// constructor (생성자)
// 설명: 클래스로 객체를 처음 만들때 출시할때 가장 먼저 실행되는 함수
// 역할: 이 기계는 처음에 이런 데이터들을 가지고 시작해" 라고 초기값을 설정함

// Access Modifiers (접근 제한자)
// 설명: 클래스 내부의 데이터를 누가 볼 수 있는지 정하는 보안 등급
// 아주 강력한 기능

/*
    public : 누구나 밖에서 보고 수정 가능
    private : 클래스 내부에서만 쓸 수 있음. 밖에서는 못 건드린다
    protected : 클래스 내부 + 상속받은 자식 클래스까지만 허용
*/

// this
// 설명 : "이 클래스가 자기 자신"을 가리키는 말.
// 내 안에 있는 변수나 함수를 부를때 씀

// 예시

class Employee {
    // 1. 속성정의 (접근 제한자 사용)
    private id: number; // 밖에서 수정 불가
    public name: string;
    protected department: string;

    // 2. 생성자: 처음 만들 때 값을 넣어줌
    constructor(id: number, name: string, dept: string) {
        this.id = id;
        this.name = name;
        this.department = dept;
    }

    // 3. 메서드 (함수): 직원이 하는 일
    work(): void{
        console.log(`${this.name}이(가) ${this.department} 부서에서 일하고 있습니다.`);
    }
}
    // 4. 인스턴스(실제 객체) 생성
    const worker = new Employee(101, "김철수", "개발팀");
    worker.work(); // 출력: 김철수이(가) 개발팀 부서에서 일하고 있습니다.

    /* 클래스와 인터페이스의 조합 */
    interface Logger {
        log(msg: string): void;
    }

    // ConsoleLogger 클래스는 Logger 인터페이스를 "구현"해야 함
    class ConsoleLogger implements Logger {
        log(msg: string) {
            console.log(`[LOG]: ${msg}`);
        }
    }

