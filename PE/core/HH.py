from collections import OrderedDict


class HeavyHitter:

	def __init__(self, vector_size: int = 512) -> None:
		self.vector_size = vector_size
		self.items = dict()
		self.inverted_items = dict()
		self.alpha = 0

	def update(self, item) -> int:

		if item in self.items.keys():
			count = self.items[item]
			self.items[item] += 1

			self.inverted_items[count].pop(item)
			if len(self.inverted_items[count]) == 0:
				if self.alpha == count:
					self.alpha += 1
				del self.inverted_items[count]

			if count + 1 not in self.inverted_items.keys():
				self.inverted_items[count + 1] = OrderedDict()
			self.inverted_items[count + 1][item] = None

			return self.items[item]

		elif len(self.items) < self.vector_size:
			self.items[item] = 1
			if 1 not in self.inverted_items.keys():
				self.inverted_items[1] = OrderedDict()
			self.inverted_items[1][item] = None
			self.alpha = 1
			return 0

		# replace

		smallest_key = self.inverted_items[self.alpha].popitem(last=False)
		self.items.pop(smallest_key[0])

		self.items[item] = self.alpha + 1

		if self.alpha + 1 not in self.inverted_items.keys():
			self.inverted_items[self.alpha + 1] = OrderedDict()
		self.inverted_items[self.alpha + 1][item] = None

		if len(self.inverted_items[self.alpha]) == 0:
			del self.inverted_items[self.alpha]
			while not (self.alpha in self.inverted_items):
				self.alpha += 1

		return 0

	def fixSubstringFrequency(self) -> None:
		keys = list(self.items.keys())
		keys.sort(key=lambda x: len(x))

		for idx, string1 in enumerate(keys):
			for string2 in keys[idx:]:
				if string1 != string2 and string1 in string2:
					self.items[string1] += self.items[string2]


def HH(
	packets: list,
	hh1_size: int = 512,
	hh2_size: int = 512,
	ratio: float = 0.8,
	deduplication: bool = False,
):

	hh1 = HeavyHitter(hh1_size)
	hh2 = HeavyHitter(hh2_size)

	tmp_counter = 0
	for packet in packets:

		signset = set()

		for idx, chunk in enumerate(packet):
			counter1 = hh1.update(chunk)

			if counter1 > 0:
				if (counter1 > ratio * tmp_counter) and (chunk not in signset):
					tmp_counter = min(counter1, tmp_counter)
					hh2.update(chunk)
					if deduplication:
						signset.add(chunk)
			else:
				if chunk not in signset:
					hh2.update(chunk)
					if deduplication:
						signset.add(chunk)

		
	hh2.fixSubstringFrequency()
	return sorted(list(hh2.items.items()), key=lambda x: -x[1])



if __name__ == '__main__':
	packets = [['http', 'asd'] * 30 for _ in range(30)]
	print(packets[0][0])

	print(HH(packets=packets, deduplication=True))
