#include <bits/stdc++.h>


using namespace std;

struct person{
    string name;
    int age;
    void hello(){
        cout << "Hello, I'm Marouane" << endl;
    }
};


int main(void){

    person maroci = {"Marouane", 22};
    maroci.hello();

    return 0;
}