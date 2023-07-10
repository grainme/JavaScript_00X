struct Person {
    name: String,
    age: i32,
}

impl Person {
    fn hello(&self) {
        println!("Hello, I'm {} and I'm {}", self.name, self.age);
    }
}

fn main() {
    let maroci = Person {
        name: String::from("Marouane"),
        age: 22,
    };

    maroci.hello();
}
