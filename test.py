import csv

'''
Define: 
    V = Visual
    K = Kinestetico
    A = Auditivo
'''

class data_management:
    def __init__(self):
        self.data = []

    def load_data(self, filename):
        with open(filename, 'r') as file:
            csvFile = csv.reader(file)
            for data in csvFile:
                self.data.append(data[1:])
    
    def get_data(self, filename):
        self.load_data(filename)
        return self.data
    
    def check_answers(self):
        for row in self.data: 
            modeloAprendizaje = [(row[0]+row[2]+row[5]+row[8]+row[9]+row[10]+row[13]),   #Visual
                                (row[1]+row[4]+row[11]+row[14]+row[17]+row[20]+row[22]), #Auditivo
                                (row[3]+row[6]+row[7]+row[12]+row[18]+row[21]+row[23])]  #Kinestésico
            if modeloAprendizaje.index(max(modeloAprendizaje)) == 0:
                row.append("V")
            elif modeloAprendizaje.index(max(modeloAprendizaje)) == 1:
                row.append("A")
            elif modeloAprendizaje.index(max(modeloAprendizaje)) == 2:
                row.append("K")
    
    def write_file(self, filename):
        with open(filename, 'w+', newline='') as file:
            writer = csv.writer(file, dialect='excel')
            writer.writerows(self.data)


data_mgmt = data_management()

data = data_mgmt.get_data("file.csv")
data_mgmt.check_answers()
data_mgmt.write_file("file2.csv")