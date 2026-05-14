import argparse
from sys import argv
import json
from datetime import datetime

def buildParser(command_handler):
    parser = argparse.ArgumentParser()

    subparser = parser.add_subparsers(
        dest="command",
        required=False,
    )

    # add parser
    add_parser = subparser.add_parser('add', help='add new expense')
    add_parser.add_argument('-n', '--name', help="name of your expenses", required=True)
    add_parser.add_argument('-a', '--amount', help="value of your expenses", required=True, type=float)
    add_parser.set_defaults(func=command_handler.add_expense)

    # update parser
    update_parser = subparser.add_parser('update', help='update expense')
    update_parser.add_argument('id', type=int)
    update_parser.add_argument('-n', '--name', help="name of your expenses")
    update_parser.add_argument('-a', '--amount', help="value of your expenses", type=float)
    update_parser.set_defaults(func=command_handler.update_expense)

    # delete expense
    delete_parser = subparser.add_parser('delete', help='delete expense')
    delete_parser.add_argument('id', type=int)
    delete_parser.set_defaults(func=command_handler.delete_expense)

    # view expense
    view_parser = subparser.add_parser('view', help='view expenses')
    view_parser.add_argument('--newest', action='store_true')
    view_parser.add_argument('--limit', type=int)
    view_parser.set_defaults(func=command_handler.view_expense)

    # summary expenses
    summary_parser = subparser.add_parser('summary', help='summary expense')
    summary_parser.add_argument('--month', type=int, choices=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    summary_parser.set_defaults(func=command_handler.summary_expense)

    return parser

class ExpensesDatabase:
    def __init__(self):
        self.filename = 'expenses_data.json'
        self.initialize_json()

    def initialize_json(self):
        layout = {
            "id_counter": 0,
            "expenses": [],
        }

        try:
            with open(self.filename, 'x', encoding='utf-8') as f:
                json.dump(layout, f, indent=2)
        except FileExistsError:
            return
        
    def load_file(self):
        with open(self.filename, 'r', encoding='utf-8') as f:
            return json.load(f)
        
    def save_file(self, data):
        with open(self.filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
        
        
class CommandsHandler:
    def __init__(self, db: ExpensesDatabase):
        self.db = db
        self.curr_data = self.db.load_file()
        self.expenses = self.curr_data['expenses']

    def add_expense(self, args):
        new_data = {
            "name": args.name,
            "amount": args.amount,
            "id": self._assign_id(),
            "created": self._get_current_date(),
            "updated": '',
        }
        self.expenses.append(new_data)
        self.db.save_file(self.curr_data)
        tabulate_data(self.expenses)

    def update_expense(self, args):
        is_found, exp_index = self._is_id_found(args)

        if not is_found:
            print('invalid id')
            exit(0)
        
        if not any([args.name, args.amount]):
            print("Please provide either -n/--name, -a/--amount, or both")
            exit(0)

        if not args.name is None:
            self.expenses[exp_index]['name'] = args.name
        if not args.amount is None:
            self.expenses[exp_index]['amount'] = args.amount
        self.expenses[exp_index]['updated'] = self._get_current_date()

        self.db.save_file(self.curr_data)
        tabulate_data(self.expenses)

    def delete_expense(self, args):
        is_found, exp_index = self._is_id_found(args)

        if not is_found:
            print('invalid id')
            exit(0)

        del self.expenses[exp_index]
        self.db.save_file(self.curr_data)
        tabulate_data(self.expenses)

    def view_expense(self, args):
        inverted_expenses = self.expenses[::-1]

        if args.limit is not None and args.limit <= 0:
            print('invalid int: use at least 1 or more')
            return

        if args.limit is not None:
            if args.newest:
                tabulate_data(inverted_expenses[:args.limit])
                return
            else:
                tabulate_data(self.expenses[:args.limit])
                return
        if args.newest:
            tabulate_data(inverted_expenses)
            return

        tabulate_data(self.expenses)
        return

    def summary_expense(self, args):

        total_expense = 0
        currency = 'RM'
        for exp in self.expenses:
            total_expense = total_expense + exp['amount']

        rounded_total = round(total_expense, 2)

        print(f'Total expense: {currency}{rounded_total}')

    def _assign_id(self):
        next_id = int(self.curr_data['id_counter'] + 1)
        self.curr_data['id_counter'] = next_id
        self.db.save_file(self.curr_data)
        return next_id
    
    def _get_current_date(self):
        today = datetime.now()
        formatted_date = today.strftime("%I:%M%p, %d %B %Y")
        return formatted_date
    
    def _is_id_found(self, args):

        exp_index = None
        is_found = False
        for index, exp in enumerate(self.expenses):
            if exp['id'] == args.id:
                is_found = True
                exp_index = index      

        return [is_found, exp_index]

def tabulate_data(data):
    if len(data) <= 0:
        print('No expenses yet')
        return

    print("\n") # For top space

    headers = ["name", "amount", "id", "created", "updated"]

    # Calculate column widths
    col_widths = {}

    for header in headers:
        max_width = len(header)
        for row in data:
            max_width = max(max_width, len(str(row[header])))
        col_widths[header] = max_width

    # Print header
    header_row = " | ".join(
        header.upper().center(col_widths[header])
        for header in headers
    )
    print(header_row)

    # Print separator
    separator = "-+-".join(
        "-" * col_widths[header]
        for header in headers
    )
    print(separator)

    # Print rows
    for row in data:
        row_line = " | ".join(
            str(row[header]).ljust(col_widths[header])
            for header in headers
        )
        print(row_line)  

    print("\n") # For bottom space

def main():
    ed = ExpensesDatabase()
    ch = CommandsHandler(ed)
    parser = buildParser(ch)
    args = parser.parse_args()

    if args.command is None:
        print(f"Try '{argv[0]} --help' for more information")
        exit(0)

    args.func(args)

if __name__ == "__main__":
    main()