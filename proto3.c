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
  bool isplayer1;
  uint8_t number_of_children;
  suite** children_array_pointer;
  //suite* children_array_pointer[COMPILE_MAX_CHILDREN];
};
suite global_temporary_array[COMPILE_MAX_CHILDREN];
uint8_t base_cards[NUMBER_OF_CARDS];
uint8_t current_cards[NUMBER_OF_CARDS];
uint8_t playable_cards[COMPILE_MAX_CHILDREN];
uint8_t already_played_cards[NUMBER_OF_CARDS];
uint8_t currentcard_generator=1;
uint8_t loop_counter= 1;
uint8_t loop = 1;
uint8_t playable_cards_counter=0;
suite* temporary_suite_pointer;
uint8_t len;
uint8_t len2;
uint8_t tab_putter;
suite* current_suite;
bool is_all_children_defined;
bool min_max_curr_val;
int count=0;

suite* generate_suite(uint8_t number, suite* parent, bool isplayer1){
  suite* generated_suite = (suite*)malloc(sizeof(struct suite));
  if (generated_suite == NULL){
    return NULL;
  }
  generated_suite->number=number;
  generated_suite->is_min_max_def=false;
  generated_suite->min_max_val=false;
  generated_suite->is_processed=false;
  generated_suite->parent=parent;
  generated_suite->isplayer1 = isplayer1;
  generated_suite->children_array_pointer = NULL;
  return generated_suite;
}

bool array_include(uint8_t value, uint8_t search_pool[],uint8_t len ){
  loop_counter=0;
  while(loop_counter<(len)){
    if(search_pool[loop_counter]==value){
      return true;
    }
    loop_counter++;
  }
  return false;
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
    loop_counter= 0;
    while(  currentcard_generator <= NUMBER_OF_CARDS){
      playable_cards[loop_counter]=currentcard_generator;
      currentcard_generator+=2;
      loop_counter ++;
    }
    return loop_counter;
  }else{
    loop_counter= 0;
    while(loop_counter < NUMBER_OF_CARDS){
      already_played_cards[loop_counter]=0;
      loop_counter ++;
    }
    loop_counter=0;
    temporary_suite_pointer=processed_suite;
    while(loop_counter<NUMBER_OF_CARDS){
      if(!temporary_suite_pointer->number==0){
        already_played_cards[loop_counter]=temporary_suite_pointer->number;
        temporary_suite_pointer=temporary_suite_pointer->parent;
        loop_counter++;
      }else{
        break;
      }
    }
    len=loop_counter;
    loop_counter=0;
    //printf("already played cards: ");
    while (loop_counter<len){
      //printf("%d; ",already_played_cards[loop_counter]);
      loop_counter++;
    }
    loop_counter=2;
    len2 = 0;
    tab_putter=0;
    while(loop_counter<=NUMBER_OF_CARDS){
      if(processed_suite->number % loop_counter == 0||loop_counter % processed_suite->number==0){
        loop = loop_counter;
        if(!array_include(loop_counter,already_played_cards,len)){
          playable_cards[tab_putter]=loop;
          len2++;
          tab_putter++;
        }
        loop_counter = loop;
      }
      loop_counter++;
    }
    return len2;
  }
}

int suite_manager(){
  suite* null_holder = generate_suite((uint8_t)0,0,false);
  if(null_holder == NULL){
    printf("here");
    goto memory_allocation_fail;
  }
  current_suite = null_holder;
  init_cards();

routine:
  //printf("routine entry: %d\n",current_suite->number);
  playable_cards_counter = playable_card(current_suite);
  if(playable_cards_counter==0){
    current_suite->is_min_max_def=true;
    current_suite->game_ended = true;
    current_suite->min_max_val= current_suite->isplayer1;
    current_suite->is_processed=true;
    current_suite=current_suite->parent;
    //printf("game ended\n");
    count++;
    goto defminmax;
  }
  loop_counter=0;
  suite** arr = (suite**)malloc(playable_cards_counter * sizeof(suite*));
  if (arr == NULL) {
    goto memory_allocation_fail;
  } 
  //printf("current card:%d\n", current_suite->number);
  while (loop_counter < playable_cards_counter) {
    arr[loop_counter] = generate_suite(playable_cards[loop_counter], current_suite,!current_suite->isplayer1);
    //printf("card: %d\n",playable_cards[loop_counter]);
    if (arr[loop_counter] == NULL) {
      goto memory_allocation_fail;
    }
    loop_counter++;
  }

  current_suite->children_array_pointer = arr;
  current_suite->number_of_children = playable_cards_counter;
  current_suite->is_processed=true;
  goto crawl;

crawl:
  //printf("crawl entry: %d<-",current_suite->number);
  if(current_suite->number==0){
    //printf("\n");
  }else{
    //printf("%d\n",current_suite->parent->number);
  }
  loop_counter=0;
   while(loop_counter<current_suite->number_of_children){
    if(!current_suite->children_array_pointer[loop_counter]->is_processed){
      current_suite=current_suite->children_array_pointer[loop_counter];
      goto routine;
    }
    loop_counter++;
  }

defminmax:
  loop_counter=0;
  is_all_children_defined=true;
  min_max_curr_val=current_suite->isplayer1;
  while(loop_counter<current_suite->number_of_children){
    if(!current_suite->children_array_pointer[loop_counter]->is_min_max_def){
      goto crawl;
    }
   if(current_suite->isplayer1){
      if(!current_suite->children_array_pointer[loop_counter]->min_max_val){
        min_max_curr_val=false;//si, en étant le joueur 1 le joueur 2 a un coup pour gagner alors le nombre joué par le joueur 1 est perdant
      }
    }else{
      if(current_suite->children_array_pointer[loop_counter]->min_max_val){
        min_max_curr_val=true;//Pareil mais pour le joueur 2
      }
    }
    loop_counter++;
  }
  current_suite->is_min_max_def= true;
  current_suite->min_max_val=min_max_curr_val;
   if(current_suite->number==0){
    goto everythings_fine;
  }
  loop_counter=0;
  while(loop_counter<current_suite->number_of_children){
    free(current_suite->children_array_pointer[loop_counter]);
    loop_counter++;
  }
  current_suite=current_suite->parent;

  goto defminmax;

memory_allocation_fail:
  printf("System does not want us to use memory");
  return 1;

everythings_fine:
  /*printf("Number of children: %d\n", current_suite->number_of_children);
  for (int i = 0; i < current_suite->number_of_children; i++) {
    printf("Child %d number: %d\n", i, current_suite->children_array_pointer[i]->number);
  }*/
  return 0;
}

void print_suite(suite* cur,uint8_t level){
  for(uint8_t i = 0; i<level; i++){
      printf("\t");
  }
  printf("[%d]=>%d(%s)->\n",level,cur->number,cur->min_max_val ? "1": "2");
  if(cur->number_of_children==0){
    for(uint8_t i = 0; i<level; i++){
      printf("\t");
    }
    printf("finnish victory => %s\n",cur->isplayer1 ? "1": "2");
    return;
  }
  for (int i = 0; i < cur->number_of_children; i++) {
    print_suite(cur->children_array_pointer[i],level+1);
  }
}

int count_stat(suite* cur){
  if(cur->number_of_children==0){
    count++;
    return 0;
  }
  for (int i = 0; i < cur->number_of_children; i++) {
    count_stat(cur->children_array_pointer[i]);
  }
  return 0;
}

void exploit_result(suite* holder){
  //print_suite(holder,0);
  //count=0;
  //count_stat(holder);
  printf("%d\n",count);
}

int main(){
  if(suite_manager()==0){
    printf("%d\n",current_suite->min_max_val);
    exploit_result(current_suite);
    return 0;
  }else{
    return 1;
  }
}
