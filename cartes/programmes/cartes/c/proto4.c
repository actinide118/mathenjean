#include <stdio.h>
#include <sys/types.h>
#include <unistd.h>
#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>
#include <sys/wait.h> 
#include "compile_options.h"

int main(){
  for (int i = 2; i <= NUMBER_OF_CARDS; i += 2) {
    pid_t pid = fork(); // Create a new process

    if (pid == -1) {
      // Fork failed
      perror("fork");
      exit(EXIT_FAILURE);
    } else if (pid == 0) {
      // Child process
      //printf("Child process for number %d\n", i);
      char str[10]; // Increased size to handle larger numbers
      sprintf(str, "%d", i);
      char *args[] = {"./cartes/programmes/cartes/c/a.out", str, NULL};
      execvp(args[0], args);

      // If execvp fails
      perror("execvp");
      exit(EXIT_FAILURE);
    }
    // Parent process continues the loop
  }

  // Parent process waits for all child processes to finish
  while (wait(NULL) > 0);

  //printf("end\n");
  return 0;
}
