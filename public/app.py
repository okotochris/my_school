secrete = "christian"
count = 5
cong = False
i = 0
def win():
    print("you won")

def lose():
    print("you couldn't get it ")

while i < count and cong is not (True):
    name = input("Guess my name: ") 
    i+=1
    if name == secrete:
        win()
        cong = True
    elif i == count:
        lose()
        cong = True
   
