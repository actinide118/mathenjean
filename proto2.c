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
uint8_t base_cards[NUMBER_OF_CARDS];
uint8_t current_cards[NUMBER_OF_CARDS];
uint8_t playable_cards[COMPILE_MAX_CHILDREN];
uint8_t currentcard_generator=1;
uint8_t loop_counter= 1;
uint8_t playable_cards_counter=0;

suite* generate_suite(uint8_t number, suite* parent){
  suite* generated_suite = (suite*)malloc(sizeof(struct suite));
  if (generated_suite == NULL){
    return NULL;
  }
  generated_suite->number=number;
  generated_suite->is_min_max_def=false;
  generated_suite->min_max_val=false;
  generated_suite->is_processed=false;
  generated_suite->parent=parent;
  return generated_suite;
}

void init_cards(){
  while(currentcard_generator<=NUMBER_OF_CARDS){
    base_cards[currentcard_generator-1]=currentcard_generator;
    current_cards[currentcard_generator-1]=currentcard_generator;
    currentcard_generator++;
  }
}

uint8_t playable_card(suite* processed_suite){
  if (processed_suite->number == 0){
    currentcard_generator = 2;
    loop_counter= 1;
    while(  currentcard_generator <= NUMBER_OF_CARDS){
      playable_cards[loop_counter-1]=currentcard_generator;
      currentcard_generator+=2;
      loop_counter ++;
    }
    return loop_counter;
  }else{}
}

int suite_manager(){
  suite* null_holder = generate_suite((uint8_t)0,0);
  if(null_holder == NULL){
    goto memory_allocation_fail;
  }
  playable_cards_counter= playable_card(null_holder);
  printf("%d",playable_cards[0]);
  printf("%d",playable_cards[1]);
  printf("%d",playable_cards[2]);
  printf("%d",playable_cards[3]);
  printf("%d",playable_cards[4]);
  init_cards();
  goto everythings_fine;
  
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

int main(){
  return suite_manager();
}
