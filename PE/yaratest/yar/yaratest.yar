import "pe"

rule sample
{
    strings:
        $a1 = "test"
        $a2 = {12 34 56}
        $a3 = /http: \/\/[a-z]{5}.com /
    condition:
        $a1 or $a2 or $a3
}
