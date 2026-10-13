import unittest

from extract_public_html import extract


class ExtractionTests(unittest.TestCase):
    def test_public_body_keeps_code_conditions_and_cta_without_script_text(self):
        html = '''<html><main><h1>Guide</h1><article><p>If ready, run it.</p>
<pre><code class="language-ts">const x = 1 &lt; 2;\n</code></pre>
<aside><h2>Free course</h2><a href="/newsletter">Join the course</a></aside>
<script>private runtime script</script></article></main></html>'''
        result = extract(html, {"route": "/guide", "url": "https://www.aihero.dev/guide"})
        self.assertIn("If ready, run it.", result["markdown"])
        self.assertIn("```ts\nconst x = 1 < 2;\n```", result["markdown"])
        self.assertIn("[Join the course](/newsletter)", result["markdown"])
        self.assertNotIn("private runtime script", result["markdown"])

    def test_streamed_public_body_replaces_shell_without_executing_scripts(self):
        html = '''<main><h1>Lesson</h1><article><!--$?--><template id="B:2"></template><p>Loading</p><!--/$--></article></main>
<div hidden id="S:2"><p>Actual lesson conditions.</p><pre><code>Output.object()</code></pre></div><script>$RC("B:2","S:2")</script>'''
        result = extract(html, {"route": "/lesson", "url": "https://www.aihero.dev/lesson"})
        self.assertIn("Actual lesson conditions.", result["markdown"])
        self.assertIn("Output.object()", result["markdown"])
        self.assertNotIn("Loading", result["markdown"])

    def test_form_cta_and_labels_stay_separate_from_copy_controls(self):
        html = '''<main><h1>Course</h1><p>Seven lessons by email.</p><button aria-live="polite">Copy page</button>
<form><label>First Name</label><label>Email*</label><button type="submit">Start the free course</button></form></main>'''
        result = extract(html, {"route": "/subscribe", "url": "https://www.aihero.dev/subscribe"})
        self.assertIn("First Name\n\nEmail*\n\nStart the free course", result["markdown"])
        self.assertNotIn("Copy page", result["markdown"])

    def test_original_code_blank_lines_are_not_collapsed_with_prose(self):
        html = '<main><h1>Code</h1><pre><code>const first = 1;\n\n\nconst second = 2;</code></pre></main>'
        result = extract(html, {"route": "/code", "url": "https://www.aihero.dev/code"})
        self.assertIn('const first = 1;\n\n\nconst second = 2;', result["markdown"])



if __name__ == "__main__":
    unittest.main()
