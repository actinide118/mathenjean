#include <stddef.h>
#include <stdint.h>
#include "compile_options.h"
#include <stdlib.h>
#include <stdio.h>

typedef struct suite suite;
struct suite{
  uint8_t number;
  suite *parent;
  bool game_ended;
  bool is_min_max_def;
  bool min_max_val;
  bool is_processed;
  uint8_t number_of_children;
  suite* children_array_pointer[COMPILE_MAX_CHILDREN];
};
suite global_temporary_array[COMPILE_MAX_CHILDREN];
//suite* sut;// = (suite*)malloc(sizeof(struct suite));

suite* generate_suite(uint8_t number, suite* parent){
  suite* generated_suite = (suite*)malloc(sizeof(struct suite));
  generated_suite->number=number;
  generated_suite->is_min_max_def=false;
  generated_suite->min_max_val=false;
  generated_suite->is_processed=false;
  generated_suite->parent=parent;
  return generated_suite;
}

int main(){
  suite* null_holder = (suite*)malloc(sizeof(struct suite));
  suite* sut= (suite*)malloc(sizeof(struct suite));
  sut = generate_suite((uint8_t)6,null_holder); 

start:

routine:

crawl:

defminmax:

memory_allocation_fail:
  printf("System does not want us to use memory");
  return 1;

everythings_fine:
  return 0;
}
