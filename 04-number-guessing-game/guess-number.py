import random
import time
from textwrap import dedent

def print_intro_msg():
    print(dedent("""
        ----------------------------------------------------------------------------

                                ==========================
                                NUMBER GUESSING GAME (NGG)
                                ==========================
                 
            How to play:
                1. A number will be selected randomly between 1 and 100
                2. You will be given a few chances to guess the number correctly
                3. Each difficulty modes have different number of chances
                4. Enter 'help' to get more info
            
            To get started, select a difficult mode:
                - Easy (20 chances)
                - Medium (10 chances)
                - Hard (5 chances)
                - Infinity (unlimited chances)
    """))

def print_help_msg():
    print('help')

def select_difficuly():
    allowed_input = ['easy', 'medium', 'hard', 'infinity']

    while True:
        user_input = input('    Enter your choice: ',)
        time.sleep(1)

        if user_input == 'help':
            print_help_msg()
            continue

        if user_input == 'quit':
            return user_input

        if user_input in allowed_input:
            return user_input
        
        print('    Invalid input. Available command: easy, medium, hard, infinity, help\n')

def get_computer_number():
    return random.randint(1, 100)

def start_game(difficulty):

    modes = {
        'easy': {'chances': 20},
        'medium': {'chances': 10},
        'hard': {'chances': 5},
        'infinity': {'chances': None},
    }
    user_chances = modes[difficulty]['chances']
    user_chances_count = 0
    round_count = 1

    print(dedent(f"""
        ----------------------------------------------------------------------------
                          
            DIFFICULTY MODE: {difficulty.upper()}
            You have {user_chances or "∞"} chances to guess 5 numbers
            
            >> Stuck? Type 'hint' to get clue <<
    """))

    while True:
        computer_num = get_computer_number()
        print(computer_num)
        
        if (user_chances_count == user_chances) and (round_count > 5):
            print(dedent("""
                ----------------------------------------------------------------------------

                    Too close! You managed to guess 5 number correctly and used all guesses chances
                            
                    Returning to main menu...
            """))
            time.sleep(5)
            return

        if user_chances_count == user_chances:
            print(dedent(f"""
                ----------------------------------------------------------------------------
                        
                    Game over. You have used all your chances to guess
                    You have guessed {round_count - 1} out of 5 number correctly

                    Returning to main menu...
            """))
            time.sleep(5)
            return

        if round_count > 5:
            print(dedent(f"""
                ----------------------------------------------------------------------------
                        
                    Wonderful. You have guess all 5 numbers correctly
                    You have used {user_chances_count} out of {user_chances} chances to guess

                    Returning to main menu...
            """))
            time.sleep(5)
            return
        
        while True:
            if difficulty == 'infinity':
                print(f'    ROUND: {round_count}/∞ | CHANCES USED: {user_chances_count}/∞')
            else:
                print(f'    ROUND: {round_count}/5 | CHANCES LEFT: {user_chances - user_chances_count}/{user_chances}')

            user_input = input('    >> ',)

            if user_input == 'quit':
                print('\n')

                if difficulty == 'infinity':
                    print('    Quitting mid game. Generating results...\n')
                    time.sleep(2)
                    print(dedent(f"""
                        ----------------------------------------------------------------------------
                                
                            Chances used: {user_chances_count} out of ∞
                            Number guessed: {round_count - 1} out of ∞

                            Returning to main menu...
                    """))
                    time.sleep(5)
                    return
                
                print('    Quitting mid game. Generating results...\n')
                time.sleep(2)
                print(dedent(f"""
                    ----------------------------------------------------------------------------
                                
                        Chances used: {user_chances_count} out of {user_chances}
                        Number guessed: {round_count - 1} out of 5

                        Returning to main menu...
                """))
                time.sleep(5)
                return
            
            if user_input == 'hint':
                if computer_num == 100:
                    print('    The number is the max number that you can guess\n')
                    continue
                elif 0 <= computer_num <= 9:
                    print('    The number is single digit\n')
                    continue
                elif 10 <= computer_num <= 99:
                    first_num = str(computer_num)[0]
                    print(f'    The number is two digit and starts with {first_num}\n')
                    continue

            if user_input == 'reveal':
                print(computer_num)

            try:
                user_num = int(user_input)
            except ValueError:
                print('    Invalid value: Please choose a number between 1 and 100\n')
                continue            

            if difficulty == 'infinity':
                if user_num == computer_num:
                    user_chances_count += 1
                    round_count += 1
                    print('    WIN!')
                    print('\n')
                    break
                else:
                    user_chances_count +=1
                    print('    LOSE!')
                    print('\n')
                    continue
                    
            if user_num == computer_num:
                user_chances_count += 1
                round_count += 1
                print('    WIN!')
                print('\n')
                break
            else:
                if user_chances_count == user_chances:
                    break
                else:
                    user_chances_count += 1
                    print('    LOSE!')
                    print('\n')
                    continue

def main():
    while True:
        print_intro_msg()
        user_input = select_difficuly()

        if user_input == 'quit':
            return

        start_game(user_input)

if __name__ == "__main__":
    main()