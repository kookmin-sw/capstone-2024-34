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

	threshold = 0
	for packet in packets:
		min_val = []
		signset = set()

		for chunk in packet:
			if chunk not in signset:
				counter1 = hh1.update(chunk)
				if counter1 >= ratio * threshold:
					min_val.append(counter1)
					hh2.update(chunk)
					if deduplication:
						signset.add(chunk)

		if len(min_val) != 0:
			threshold = min(min_val)

	hh2.fixSubstringFrequency()
	return ([i for i in sorted(list(hh2.items.items()), key=lambda x: -x[1]) if i[1] >= threshold]) # i[0] not in hh1.items and hh1.items[i[0]] >= threshold


if __name__ == '__main__':
	packets = [['http'], ['http', 'asdfq'], ['asd', 'asdfq']]
	packets += [['asdfq'] for _ in range(10)]
	print(HH(packets=packets, deduplication=True, ratio=0.5, hh2_size=1))
