"""
示例工具模块
"""


def greet(name: str) -> str:
    """返回问候语"""
    return f"你好，{name}！"


def calculate_sum(numbers: list[int]) -> int:
    """计算数字列表的总和"""
    return sum(numbers)


if __name__ == "__main__":
    print(greet("世界"))
    print(f"1 到 5 的和：{calculate_sum([1, 2, 3, 4, 5])}")
